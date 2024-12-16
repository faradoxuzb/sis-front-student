import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnDestroy, OnInit, TemplateRef, ViewChild, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { MatDialog } from '@angular/material/dialog';
import { MatDrawer } from '@angular/material/sidenav';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { Calendar as FullCalendar, CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';
import momentPlugin from '@fullcalendar/moment';
import timeGridPlugin from '@fullcalendar/timegrid';
import { clone, cloneDeep, isEqual, omit } from 'lodash-es';
import  moment from 'moment';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FuseMediaWatcherService } from '@fuse/services/media-watcher';
import {
    Calendar,
    CalendarDrawerMode,
    CalendarEvent,
    CalendarEventEditMode,
    CalendarEventPanelMode, CalendarSettings,
} from './calendar.types';
import { CalendarService } from './calendar.service';

@Component({
    selector       : 'calendar',
    templateUrl    : './calendar.component.html',
    styleUrls      : ['./calendar.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation  : ViewEncapsulation.None
})
export class CalendarComponent implements OnInit, AfterViewInit, OnDestroy
{
    @ViewChild('eventPanel') private _eventPanel: TemplateRef<any>;
    @ViewChild('fullCalendar') private _fullCalendar: FullCalendarComponent;
    @ViewChild('drawer') private _drawer: MatDrawer;

    calendars: Calendar[];
    calendarPlugins: any[] = [dayGridPlugin,  interactionPlugin, listPlugin, momentPlugin, timeGridPlugin];
    drawerMode: CalendarDrawerMode = 'side';
    drawerOpened: boolean = false;
    event: CalendarEvent;
    eventEditMode: CalendarEventEditMode = 'single';
    eventForm: FormGroup;
    eventTimeFormat: any = {
        hour    : '2-digit',
        hour12  : false,
        minute  : '2-digit',
        meridiem: 'short'
    };
    events: CalendarEvent[] = [];
    panelMode: CalendarEventPanelMode = 'view';
    settings: CalendarSettings;
    view: 'dayGridMonth' | 'timeGridWeek' | 'timeGridDay' | 'listYear' = 'timeGridWeek';
    views: any = {
        dayGridMonth: {
            eventLimit     : 3,
            eventTimeFormat: this.eventTimeFormat,
            fixedWeekCount : false
        },
        timeGrid    : {
            allDayText        : '',
            columnHeaderFormat: {
                weekday   : 'short',
                day       : 'numeric',
                omitCommas: true
            },
            columnHeaderHtml  : (date): string => `<span class="fc-weekday">${moment(date).format('ddd')}</span>
                                                       <span class="fc-date">${moment(date).format('D')}</span>`,
            slotDuration      : '01:00:00',
            slotLabelFormat   : this.eventTimeFormat
        },
        timeGridWeek: {},
        timeGridDay : {},
        listYear    : {
            allDayText      : 'All day',
            eventTimeFormat : this.eventTimeFormat,
            listDayFormat   : false,
            listDayAltFormat: false
        }
    };
    viewTitle: string;

    private _eventPanelOverlayRef: OverlayRef;
    private _fullCalendarApi: FullCalendar;
    private _unsubscribeAll: Subject<any> = new Subject<any>();
     TODAY_STR = new Date().toISOString().replace(/T.*$/, '');
    calendarOptions: CalendarOptions;

    /**
     * Constructor
     */
    constructor(
        private _calendarService: CalendarService,
        private _changeDetectorRef: ChangeDetectorRef,
        @Inject(DOCUMENT) private _document: Document,
        private _formBuilder: FormBuilder,
        private _matDialog: MatDialog,
        private _overlay: Overlay,
        private _fuseMediaWatcherService: FuseMediaWatcherService,
        private _viewContainerRef: ViewContainerRef
    )
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        // Create the event form
        this.eventForm = this._formBuilder.group({
            id              : [''],
            calendarId      : [''],
            recurringEventId: [null],
            title           : [''],
            description     : [''],
            start           : [null],
            end             : [null],
            duration        : [null],
            allDay          : [true],
            recurrence      : [null],
            range           : [{}]
        });

        // Subscribe to 'range' field value changes
        this.eventForm.get('range').valueChanges.subscribe((value) => {

            if ( !value )
            {
                return;
            }

            // Set the 'start' field value from the range
            this.eventForm.get('start').setValue(value.start, {emitEvent: false});

            // If this is a recurring event...
            if ( this.eventForm.get('recurrence').value )
            {

            }
            // Otherwise...
            else
            {
                // Set the end field
                this.eventForm.get('end').setValue(value.end, {emitEvent: false});
            }
        });


        // Get calendars
        this._calendarService.calendars$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((calendars) => {

                // Store the calendars
                this.calendars = calendars;

                // Mark for check
                this._changeDetectorRef.markForCheck();
            });

        // Get events
        this._calendarService.events$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((events) => {

                // Clone the events to change the object reference so
                // that the FullCalendar can trigger a re-render.
                this.events = cloneDeep(events);
                this.calendarOptions = {
                    initialView: this.view,
                    headerToolbar: false,
                    firstDay: 1,
                    handleWindowResize: false,
                    height: 'parent',
                    rerenderDelay: 10,
                    hiddenDays: [0],
                    plugins: this.calendarPlugins,
                    views: this.views,
                    eventDidMount: this.onEventRender.bind(this),
                    events: this.events,
                    eventsSet: (events) => {
                        console.log(events);
                    },
                    businessHours: {
                        daysOfWeek: [1, 2, 3, 4, 5],
                        startTime: '08:00',
                        endTime: '18:00'
                    },
                    slotMinTime: '07:00:00',
                    nowIndicator: true,
                    eventBorderColor: '#bf9000',

                }

                // Mark for check
                this._changeDetectorRef.markForCheck();
            });



        // Subscribe to media changes
        this._fuseMediaWatcherService.onMediaChange$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(({matchingAliases}) => {

                // Set the drawerMode and drawerOpened if the given breakpoint is active
                if ( matchingAliases.includes('md') )
                {
                    this.drawerMode = 'side';
                    this.drawerOpened = false;
                }
                else
                {
                    this.drawerMode = 'over';
                    this.drawerOpened = false;
                }

                // Mark for check
                this._changeDetectorRef.markForCheck();
            });

        // Build the view specific FullCalendar options
        this.views = {
            dayGridMonth: {
                eventLimit     : 3,
                eventTimeFormat: this.eventTimeFormat,
                fixedWeekCount : false
            },
            timeGrid    : {
                allDayText        : '',
                columnHeaderFormat: {
                    weekday   : 'short',
                    day       : 'numeric',
                    omitCommas: true
                },
                columnHeaderHtml  : (date): string => `<span class="fc-weekday">${moment(date).format('ddd')}</span>
                                                       <span class="fc-date">${moment(date).format('D')}</span>`,
                slotDuration      : '01:00:00',
                slotLabelFormat   : this.eventTimeFormat
            },
            timeGridWeek: {},
            timeGridDay : {},
            listYear    : {
                allDayText      : 'All day',
                eventTimeFormat : this.eventTimeFormat,
                listDayFormat   : false,
                listDayAltFormat: false
            }
        };
    }

    /**
     * After view init
     */
    ngAfterViewInit(): void
    {
        // Get the full calendar API
        this._fullCalendarApi = this._fullCalendar.getApi();

        // Get the current view's title
        this.viewTitle = this._fullCalendarApi.view.title;

        // Get the view's current start and end dates, add/subtract
        // 60 days to create a ~150 days period to fetch the data for
        const viewStart = moment(this._fullCalendarApi.view.currentStart).subtract(60, 'days');
        const viewEnd = moment(this._fullCalendarApi.view.currentEnd).add(60, 'days');

        // Get events
        this._calendarService.getEvents(viewStart, viewEnd, true).subscribe();
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();

        // Dispose the overlay
        if ( this._eventPanelOverlayRef )
        {
            this._eventPanelOverlayRef.dispose();
        }
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Toggle Drawer
     */
    toggleDrawer(): void
    {
        // Toggle the drawer
        this._drawer.toggle();
    }


    /**
     * Change the event panel mode between view and edit
     * mode while setting the event edit mode
     *
     * @param panelMode
     * @param eventEditMode
     */
    changeEventPanelMode(panelMode: CalendarEventPanelMode, eventEditMode: CalendarEventEditMode = 'single'): void
    {
        // Set the panel mode
        this.panelMode = panelMode;

        // Set the event edit mode
        this.eventEditMode = eventEditMode;

        // Update the panel position
        setTimeout(() => {
            this._eventPanelOverlayRef.updatePosition();
        });
    }

    /**
     * Get calendar by id
     *
     * @param id
     */
    getCalendar(id): Calendar
    {
        if ( !id )
        {
            return;
        }

        return this.calendars.find(calendar => calendar.id === id);
    }

    /**
     * Change the calendar view
     *
     * @param view
     */
    changeView(view: 'dayGridMonth' | 'timeGridWeek' | 'timeGridDay' | 'listYear'): void
    {
        // Store the view
        this.view = view;

        // If the FullCalendar API is available...
        if ( this._fullCalendarApi )
        {
            // Set the view
            this._fullCalendarApi.changeView(view);

            // Update the view title
            this.viewTitle = this._fullCalendarApi.view.title;
        }
    }

    /**
     * Moves the calendar one stop back
     */
    previous(): void
    {
        // Go to previous stop
        this._fullCalendarApi.prev();

        // Update the view title
        this.viewTitle = this._fullCalendarApi.view.title;

        // Get the view's current start date
        const start = moment(this._fullCalendarApi.view.currentStart);

        // Prefetch past events
        this._calendarService.prefetchPastEvents(start).subscribe();
    }

    /**
     * Moves the calendar to the current date
     */
    today(): void
    {
        // Go to today
        this._fullCalendarApi.today();

        // Update the view title
        this.viewTitle = this._fullCalendarApi.view.title;
    }

    /**
     * Moves the calendar one stop forward
     */
    next(): void
    {
        // Go to next stop
        this._fullCalendarApi.next();

        // Update the view title
        this.viewTitle = this._fullCalendarApi.view.title;

        // Get the view's current end date
        const end = moment(this._fullCalendarApi.view.currentEnd);

        // Prefetch future events
        this._calendarService.prefetchFutureEvents(end).subscribe();
    }

    /**
     * On date click
     *
     * @param calendarEvent
     */
    onDateClick(calendarEvent): void
    {
        // Prepare the event
        const event = {
            id              : null,
            calendarId      : this.calendars[0].id,
            recurringEventId: null,
            isFirstInstance : false,
            title           : '',
            description     : '',
            start           : moment(calendarEvent.date).startOf('day').toISOString(),
            end             : moment(calendarEvent.date).endOf('day').toISOString(),
            duration        : null,
            allDay          : true,
            recurrence      : null,
            range           : {
                start: moment(calendarEvent.date).startOf('day').toISOString(),
                end  : moment(calendarEvent.date).endOf('day').toISOString()
            }
        };

        // Set the event
        this.event = event;

        // Set the el on calendarEvent for consistency
        calendarEvent.el = calendarEvent.dayEl;

        // Reset the form and fill the event
        this.eventForm.reset();
        this.eventForm.patchValue(event);

        // Open the event panel
        this._openEventPanel(calendarEvent);

        // Change the event panel mode
        this.changeEventPanelMode('add');
    }

    /**
     * On event click
     *
     * @param calendarEvent
     */
    onEventClick(calendarEvent): void
    {
        // Find the event with the clicked event's id
        const event: any = cloneDeep(this.events.find(item => item.id === calendarEvent.event.id));

        // Set the event
        this.event = event;

        // Prepare the end value
        let end;

        // If this is a recurring event...
        if ( event.recuringEventId )
        {
            // Calculate the end value using the duration
            end = moment(event.start).add(event.duration, 'minutes').toISOString();
        }
        // Otherwise...
        else
        {
            // Set the end value from the end
            end = event.end;
        }

        // Set the range on the event
        event.range = {
            start: event.start,
            end
        };

        // Reset the form and fill the event
        this.eventForm.reset();
        this.eventForm.patchValue(event);

        // Open the event panel
        this._openEventPanel(calendarEvent);
    }

    /**
     * On event render
     *
     * @param calendarEvent
     */
    onEventRender(calendarEvent): void
    {
        // Get event's calendar
        const calendar = this.calendars.find(item => item.id === calendarEvent.event.extendedProps.calendarId);

        // Return if the calendar doesn't exist...
        if ( !calendar )
        {
            return;
        }

        // If current view is year list...
        if ( this.view === 'listYear' )
        {
            // Create a new 'fc-list-item-date' node
            const fcListItemDate1 = `<td class="fc-list-item-date">
                                            <span>
                                                <span>${moment(calendarEvent.event.start).format('D')}</span>
                                                <span>${moment(calendarEvent.event.start).format('MMM')}, ${moment(calendarEvent.event.start).format('ddd')}</span>
                                            </span>
                                        </td>`;

            // Insert the 'fc-list-item-date' into the calendar event element
            calendarEvent.el.insertAdjacentHTML('afterbegin', fcListItemDate1);

            // Set the color class of the event dot
            calendarEvent.el.getElementsByClassName('fc-list-event-dot')[0].classList.add(calendar.color);

            // Set the event's title to '(No title)' if event title is not available
            if ( !calendarEvent.event.title )
            {
                calendarEvent.el.querySelector('.fc-list-item-title').innerText = '(No title)';
            }
        }
        // If current view is not month list...
        else
        {
            console.log(calendarEvent);
            // Set the color class of the event
            calendarEvent.el.classList.add(calendar.color);

            // Set the event's title to '(No title)' if event title is not available
            if ( !calendarEvent.event.title )
            {
                calendarEvent.el.querySelector('.fc-title').innerText = '(No title)';
            }
        }

        // Set the event's visibility
        calendarEvent.el.style.display = calendar.visible ? 'flex' : 'none';
    }

    /**
     * On calendar updated
     *
     * @param calendar
     */
    onCalendarUpdated(calendar): void
    {
        // Re-render the events
        this._fullCalendarApi.render();
    }

    /**
     * Add event
     */
    addEvent(): void
    {
        // Get the clone of the event form value
        let newEvent = clone(this.eventForm.value);

        // If the event is a recurring event...
        if ( newEvent.recurrence )
        {
            // Set the event duration
            newEvent.duration = moment(newEvent.range.end).diff(moment(newEvent.range.start), 'minutes');
        }

        // Modify the event before sending it to the server
        newEvent = omit(newEvent, ['range', 'recurringEventId']);

        // Add the event
        this._calendarService.addEvent(newEvent).subscribe(() => {

            // Reload events
            this._calendarService.reloadEvents().subscribe();

            // Close the event panel
            this._closeEventPanel();
        });
    }

    /**
     * Update the event
     */
    updateEvent(): void
    {
        // Get the clone of the event form value
        let event = clone(this.eventForm.value);
        const {
                  range,
                  ...eventWithoutRange
              } = event;

        // Get the original event
        const originalEvent = this.events.find(item => item.id === event.id);

        // Return if there are no changes made to the event
        if ( isEqual(eventWithoutRange, originalEvent) )
        {
            // Close the event panel
            this._closeEventPanel();

            // Return
            return;
        }

        // If the event is a recurring event...
        if ( event.recurrence && event.recurringEventId )
        {
            // Update the recurring event on the server
            this._calendarService.updateRecurringEvent(event, originalEvent, this.eventEditMode).subscribe(() => {

                // Reload events
                this._calendarService.reloadEvents().subscribe();

                // Close the event panel
                this._closeEventPanel();
            });

            // Return
            return;
        }

        // If the event is a non-recurring event...
        if ( !event.recurrence && !event.recurringEventId )
        {
            // Update the event on the server
            this._calendarService.updateEvent(event.id, event).subscribe(() => {

                // Close the event panel
                this._closeEventPanel();
            });

            // Return
            return;
        }

        // If the event was a non-recurring event but now it will be a recurring event...
        if ( event.recurrence && !event.recurringEventId )
        {
            // Set the event duration
            event.duration = moment(event.range.end).diff(moment(event.range.start), 'minutes');

            // Omit unnecessary fields
            event = omit(event, ['range', 'recurringEventId']);

            // Update the event on the server
            this._calendarService.updateEvent(event.id, event).subscribe(() => {

                // Reload events
                this._calendarService.reloadEvents().subscribe();

                // Close the event panel
                this._closeEventPanel();
            });

            // Return
            return;
        }

        // If the event was a recurring event but now it will be a non-recurring event...
        if ( !event.recurrence && event.recurringEventId )
        {
            // Set the end date
            event.end = moment(event.start).add(event.duration, 'minutes').toISOString();

            // Set the duration as null
            event.duration = null;

            // Update the recurring event on the server
            this._calendarService.updateRecurringEvent(event, originalEvent, this.eventEditMode).subscribe(() => {

                // Reload events
                this._calendarService.reloadEvents().subscribe();

                // Close the event panel
                this._closeEventPanel();
            });
        }
    }

    /**
     * Delete the given event
     *
     * @param event
     * @param mode
     */
    deleteEvent(event, mode: CalendarEventEditMode = 'single'): void
    {
        // If the event is a recurring event...
        if ( event.recurrence )
        {
            // Delete the recurring event on the server
            this._calendarService.deleteRecurringEvent(event, mode).subscribe(() => {

                // Reload events
                this._calendarService.reloadEvents().subscribe();

                // Close the event panel
                this._closeEventPanel();
            });
        }
        // If the event is a non-recurring, normal event...
        else
        {
            // Update the event on the server
            this._calendarService.deleteEvent(event.id).subscribe(() => {

                // Close the event panel
                this._closeEventPanel();
            });
        }
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Private methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Create the event panel overlay
     *
     * @private
     */
    private _createEventPanelOverlay(positionStrategy): void
    {
        // Create the overlay
        this._eventPanelOverlayRef = this._overlay.create({
            panelClass    : ['calendar-event-panel'],
            backdropClass : '',
            hasBackdrop   : true,
            scrollStrategy: this._overlay.scrollStrategies.reposition(),
            positionStrategy
        });

        // Detach the overlay from the portal on backdrop click
        this._eventPanelOverlayRef.backdropClick().subscribe(() => {
            this._closeEventPanel();
        });
    }

    /**
     * Open the event panel
     *
     * @private
     */
    private _openEventPanel(calendarEvent): void
    {
        const positionStrategy = this._overlay.position().flexibleConnectedTo(calendarEvent.el).withFlexibleDimensions(false).withPositions([
            {
                originX : 'end',
                originY : 'top',
                overlayX: 'start',
                overlayY: 'top',
                offsetX : 8
            },
            {
                originX : 'start',
                originY : 'top',
                overlayX: 'end',
                overlayY: 'top',
                offsetX : -8
            },
            {
                originX : 'start',
                originY : 'bottom',
                overlayX: 'end',
                overlayY: 'bottom',
                offsetX : -8
            },
            {
                originX : 'end',
                originY : 'bottom',
                overlayX: 'start',
                overlayY: 'bottom',
                offsetX : 8
            }
        ]);

        // Create the overlay if it doesn't exist
        if ( !this._eventPanelOverlayRef )
        {
            this._createEventPanelOverlay(positionStrategy);
        }
        // Otherwise, just update the position
        else
        {
            this._eventPanelOverlayRef.updatePositionStrategy(positionStrategy);
        }

        // Attach the portal to the overlay
        this._eventPanelOverlayRef.attach(new TemplatePortal(this._eventPanel, this._viewContainerRef));

        // Mark for check
        this._changeDetectorRef.markForCheck();
    }

    /**
     * Close the event panel
     *
     * @private
     */
    private _closeEventPanel(): void
    {
        // Detach the overlay from the portal
        this._eventPanelOverlayRef.detach();

        // Reset the panel and event edit modes
        this.panelMode = 'view';
        this.eventEditMode = 'single';

        // Mark for check
        this._changeDetectorRef.markForCheck();
    }
}
