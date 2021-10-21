const months = ["ENE", "FEB", "MAR", "ABR", "MAY", "JUN", "JUL", "AGO", "SEP", "OCT", "NOV", "DIC"];
const monthsLegends = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
const weekDays = ["LUN", "MAR", "MIE", "JUE", "VIE", "SAB", "DOM"];
const weekDaysLegends = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];

const handledEventListenerCalendar = () => {
    const elementParent = document.querySelectorAll('.calendar__input');

    elementParent.forEach((event) => {
        event.addEventListener("click", (e) => {
            const attrs = [e.target.attributes];

            const element = document.querySelector(attrs[0].target.value);
            const datepicker = e.target.value;
            const dates = datepicker !== "" ? [datepicker.split(' / ')] : null;
            const date = dates ? `${dates[0][0]}-${dates[0][1]}-${dates[0][2]}` : null;

            handledCalendar({
                containerDateSelection: '.container__datepicker__dateselection',
                containerSelectionCalendar: '.section__datepicker__sectioncalendar',
                containerMonth: '.section__datepicker__month',
                containerDaysHead: '.section__datepicker__dayshead',
                containerDaysBody: '.section__datepicker__daysbody',
                date: date,
                target: "#input__date"
            });

            element.animate([
                { opacity: 0 },
                { opacity: 1 }
            ], { duration: 200 }); 

            element.style.display = "block";
        });
    });

    const listenerHidden = document.querySelectorAll('html');

    listenerHidden.forEach((event) => {
        event.addEventListener("click", (e) => {    
            const classList = e.target.classList;
            let hidden = true;
            
            console.log([e]);

            classList.forEach((element) => {
                if(element === "calendar__active"){
                    hidden = false;
                }
            });

            if(hidden){

                const elements = document.querySelectorAll('tc-calendar');

                elements.forEach((element) => {
                    element.animate([
                        { opacity: 0 },
                        { opacity: 1 }
                    ], { duration: 200 }); 

                    element.style.display = "none";
                });
            }
        });
    });
};

const handledEventCalendar = () => {
    
    const elementDay = document.querySelectorAll('.button__selector__date');

    elementDay.forEach((event) => {
        event.addEventListener("click", (e) => {
            const attrs = [e.target.attributes];
            const date =  `${attrs[0].day.value}-${Number(attrs[0].month.value) + 1}-${attrs[0].year.value}`;

            document.querySelector(attrs[0].target.value).removeAttribute('readonly');
            document.querySelector(attrs[0].target.value).value = `${Number(attrs[0].day.value) < 10 ? '0'.padEnd(2, attrs[0].day.value) : attrs[0].day.value} / ${Number(attrs[0].month.value) + 1 < 10 ? '0'.padEnd(2, Number(attrs[0].month.value) + 1) : Number(attrs[0].month.value) + 1} / ${attrs[0].year.value}`
            document.querySelector(attrs[0].target.value).setAttribute('readonly', 'readonly');

            handledCalendar({
                containerDateSelection: '.container__datepicker__dateselection',
                containerSelectionCalendar: '.section__datepicker__sectioncalendar',
                containerMonth: '.section__datepicker__month',
                containerDaysHead: '.section__datepicker__dayshead',
                containerDaysBody: '.section__datepicker__daysbody',
                date: date,
                target: "#input__date"
            });

        });
    });

    const elementPrevMonth = document.querySelectorAll('.button__prev__month');

    elementPrevMonth.forEach((event) => {
        event.addEventListener("click", (e) => {
            const attrs = [e.target.attributes];
            const date =  `1-${Number(attrs[0].month.value) + 1}-${attrs[0].year.value}`;
            const dateInput = document.querySelector(attrs[0].target.value).value;

            handledCalendar({
                containerDateSelection: '.container__datepicker__dateselection',
                containerSelectionCalendar: '.section__datepicker__sectioncalendar',
                containerMonth: '.section__datepicker__month',
                containerDaysHead: '.section__datepicker__dayshead',
                containerDaysBody: '.section__datepicker__daysbody',
                date: date,
                event: 'prev',
                dateSelected: dateInput !== "" ? dateInput : null,
                target: "#input__date"
            });

        });
    });

    const elementNextMonth = document.querySelectorAll('.button__next__month');

    elementNextMonth.forEach((event) => {
        event.addEventListener("click", (e) => {
            const attrs = [e.target.attributes];
            const date =  `1-${Number(attrs[0].month.value) + 1}-${attrs[0].year.value}`;
            const dateInput = document.querySelector(attrs[0].target.value).value;

            handledCalendar({
                containerDateSelection: '.container__datepicker__dateselection',
                containerSelectionCalendar: '.section__datepicker__sectioncalendar',
                containerMonth: '.section__datepicker__month',
                containerDaysHead: '.section__datepicker__dayshead',
                containerDaysBody: '.section__datepicker__daysbody',
                date: date,
                event: 'next',
                dateSelected: dateInput !== "" ? dateInput : null,
                target: "#input__date"
            });

        });
    });

    const elementMonths = document.querySelectorAll('.button__months');

    elementMonths.forEach((event) => {
        event.addEventListener("click", (e) => {
            const attrs = [e.target.attributes];

            handledCalendarMonths({
                containerDateSelection: '.container__datepicker__dateselection',
                containerSelectionCalendar: '.section__datepicker__sectioncalendar',
                containerYear: '.section__datepicker__month',
                containerHead: '.section__datepicker__dayshead',
                containerMonth : '.section__datepicker__daysbody',
                year: attrs[0].year.value,
                target: "#input__date"
            });
        });
    });

    const elementSelectionMonth = document.querySelectorAll('.button__selector__monthdate');

    elementSelectionMonth.forEach((event) => {
        event.addEventListener("click", (e) => {
            const attrs = [e.target.attributes];
            const date =  `1-${Number(attrs[0].month.value) + 1}-${attrs[0].year.value}`;
            const dateInput = document.querySelector(attrs[0].target.value).value;

            handledCalendar({
                containerDateSelection: '.container__datepicker__dateselection',
                containerSelectionCalendar: '.section__datepicker__sectioncalendar',
                containerMonth: '.section__datepicker__month',
                containerDaysHead: '.section__datepicker__dayshead',
                containerDaysBody: '.section__datepicker__daysbody',
                date: date,
                event: 'selectMonth',
                dateSelected: dateInput !== "" ? dateInput : null,
                target: "#input__date"
            });
        });
    });

    const elementPrevYear = document.querySelectorAll('.button__prev__year');

    elementPrevYear.forEach((event) => {
        event.addEventListener("click", (e) => {
            const attrs = [e.target.attributes];

            handledCalendarMonths({
                containerDateSelection: '.container__datepicker__dateselection',
                containerSelectionCalendar: '.section__datepicker__sectioncalendar',
                containerYear: '.section__datepicker__month',
                containerHead: '.section__datepicker__dayshead',
                containerMonth : '.section__datepicker__daysbody',
                year: attrs[0].year.value,
                target: "#input__date"
            });
        });
    });

    const elementNextYear = document.querySelectorAll('.button__next__year');

    elementNextYear.forEach((event) => {
        event.addEventListener("click", (e) => {
            const attrs = [e.target.attributes];

            handledCalendarMonths({
                containerDateSelection: '.container__datepicker__dateselection',
                containerSelectionCalendar: '.section__datepicker__sectioncalendar',
                containerYear: '.section__datepicker__month',
                containerHead: '.section__datepicker__dayshead',
                containerMonth : '.section__datepicker__daysbody',
                year: attrs[0].year.value,
                target: "#input__date"
            });
        });
    });

    const elementYears = document.querySelectorAll('.button__years');

    elementYears.forEach((event) => {
        event.addEventListener("click", (e) => {
            const attrs = [e.target.attributes];

            handledCalendarYears({
                containerDateSelection: '.container__datepicker__dateselection',
                containerSelectionCalendar: '.section__datepicker__sectioncalendar',
                containerHeadYear: '.section__datepicker__month',
                containerHead: '.section__datepicker__dayshead',
                containerYear: '.section__datepicker__daysbody',
                year: attrs[0].year.value,
                target: "#input__date"
            });
        });
    });

    const elementSelectionYear = document.querySelectorAll('.button__selector__yeardate');

    elementSelectionYear.forEach((event) => {
        event.addEventListener("click", (e) => {
            const attrs = [e.target.attributes];

            handledCalendarMonths({
                containerDateSelection: '.container__datepicker__dateselection',
                containerSelectionCalendar: '.section__datepicker__sectioncalendar',
                containerYear: '.section__datepicker__month',
                containerHead: '.section__datepicker__dayshead',
                containerMonth : '.section__datepicker__daysbody',
                year: attrs[0].year.value,
                target: "#input__date"
            });
        });
    });


    const elementPrevYears = document.querySelectorAll('.button__prev__years');

    elementPrevYears.forEach((event) => {
        event.addEventListener("click", (e) => {
            const attrs = [e.target.attributes];

            handledCalendarYears({
                containerDateSelection: '.container__datepicker__dateselection',
                containerSelectionCalendar: '.section__datepicker__sectioncalendar',
                containerHeadYear: '.section__datepicker__month',
                containerHead: '.section__datepicker__dayshead',
                containerYear: '.section__datepicker__daysbody',
                year: attrs[0].year.value,
                target: "#input__date"
            });
        });
    });

    const elementNextYears = document.querySelectorAll('.button__next__years');

    elementNextYears.forEach((event) => {
        event.addEventListener("click", (e) => {
            const attrs = [e.target.attributes];

            handledCalendarYears({
                containerDateSelection: '.container__datepicker__dateselection',
                containerSelectionCalendar: '.section__datepicker__sectioncalendar',
                containerHeadYear: '.section__datepicker__month',
                containerHead: '.section__datepicker__dayshead',
                containerYear: '.section__datepicker__daysbody',
                year: attrs[0].year.value,
                target: "#input__date"
            });
        });
    });

};

const handledCalendarYears = ({
    containerDateSelection = "",
    containerSelectionCalendar = "",
    containerHeadYear = "",
    containerHead = "",
    containerYear = "",
    year = null,
    target = ""
}) => {

    let yearsContent = "";

    const __yearLimitInit = Number(year) - 4
    const __yearLimitEnd = Number(year) + 4

    const __yearInitEndPrev = __yearLimitInit - 5;
    const __yearInitInitNext = __yearLimitEnd + 5;

    let years = [];

    document.querySelector(containerDateSelection).innerHTML =
    `
        <tc-calendar-row class="calendar__active">
            <tc-calendar-col class="calendar__active">
                Años
            </tc-calendar-col>
        </tc-calendar-row>
        <tc-calendar-row class="tc-calendar-col-title calendar__active">
            <tc-calendar-col class="calendar__active">
                <h4 class="calendar__active">
                    ${__yearLimitInit}
                </h4>
            </tc-calendar-col>
        </tc-calendar-row>
        <tc-calendar-row class="tc-calendar-col-title calendar__active">
            <tc-calendar-col class="calendar__active">
                <h5 class="calendar__active">
                    ${__yearLimitEnd}
                </h5>
            </tc-calendar-col>
        </tc-calendar-row>
    `;

    document.querySelector(containerSelectionCalendar).innerHTML = 
    `   
        <tc-calendar-row class="tc-calendar-row-menu calendar__active">
            <tc-calendar-col class="tc-calendar-col-left-arrow calendar__active button__prev__years" year="${__yearInitEndPrev}" target="${target}">
                <img src="img/left-arrow.svg" class="left-arrow calendar__active" year="${__yearInitEndPrev}" target="${target}"/>
            </tc-calendar-col>
            <tc-calendar-col class="tc-calendar-col-middle calendar__active" year="${__yearInitEndPrev}" target="${target}">
                ${__yearLimitInit} - ${__yearLimitEnd}
            </tc-calendar-col>
            <tc-calendar-col class="tc-calendar-col-right-arrow calendar__active button__next__years" year="${__yearInitInitNext}" target="${target}">
                <img src="img/right-arrow.svg" class="right-arrow calendar__active" year="${__yearInitInitNext}"  target="${target}"/>
            </tc-calendar-col>
        </tc-calendar-row>
    `;

    document.querySelector(containerHeadYear).innerHTML =
    `
        <tc-calendar-row class="tc-calendar-row-titles calendar__active">
            <tc-calendar-col class="calendar__active">
                Desde el Año ${__yearLimitInit} hasta el ${__yearLimitEnd}
            </tc-calendar-col>
        </tc-calendar-row>
    `;

    document.querySelector(containerHead).innerHTML = "";

    for(let y = __yearLimitInit; y <= __yearLimitEnd; y++){
        years[(y + __yearLimitInit) - __yearLimitInit] = y;
    }

    let row = 1;

    years.forEach((element) => {
        if(row === 1){
            yearsContent += `<tc-calendar-row class="tc-calendar-row-body-month calendar__active">`;
        }

        yearsContent += 
        `
            <tc-calendar-col class="tc-calendar-month button__selector__yeardate calendar__active" year="${element}" target="${target}">
               ${ element }                 
            </tc-calendar-col>
        `;
        
        row++;

        if(row === 4){
            yearsContent += `</tc-calendar-row>`;
            row = 1;
        }
    });

    document.querySelector(containerYear).innerHTML = yearsContent;
    handledEventCalendar();
};

const handledCalendarMonths = ({
    containerDateSelection = "",
    containerSelectionCalendar = "",
    containerYear = "",
    containerHead = "",
    containerMonth = "",
    year = null,
    target = ""
}) => {

    let monthsContent = "";
    const __prevYears = Number(year) - 1;
    const __nextYears = Number(year) + 1;

    document.querySelector(containerDateSelection).innerHTML =
    `
        <tc-calendar-row class="calendar__active">
            <tc-calendar-col class="calendar__active">
                Año
            </tc-calendar-col>
        </tc-calendar-row>
        <tc-calendar-row class="tc-calendar-row-title calendar__active">
            <tc-calendar-col class="calendar__active">
                <h1 class="calendar__active">
                    ${year}
                </h1>
            </tc-calendar-col>
        </tc-calendar-row>
    `;

    document.querySelector(containerSelectionCalendar).innerHTML = 
    `   
        <tc-calendar-row class="tc-calendar-row-menu calendar__active">
            <tc-calendar-col class="tc-calendar-col-left-arrow calendar__active button__prev__year" year="${__prevYears}" target="${target}">
                <img src="img/left-arrow.svg" class="left-arrow calendar__active" year="${__prevYears}" target="${target}"/>
            </tc-calendar-col>
            <tc-calendar-col class="tc-calendar-col-middle calendar__active button__years" month="" year="${year}" target="${target}">
                ${year}
            </tc-calendar-col>
            <tc-calendar-col class="tc-calendar-col-right-arrow calendar__active button__next__year" year="${__nextYears}" target="${target}">
                <img src="img/right-arrow.svg" class="right-arrow calendar__active" year="${__nextYears}"  target="${target}"/>
            </tc-calendar-col>
        </tc-calendar-row>
    `;

    document.querySelector(containerYear).innerHTML = 
    `
        <tc-calendar-row class="tc-calendar-row-titles calendar__active">
            <tc-calendar-col class="calendar__active">
                Meses Año ${year}
            </tc-calendar-col>
        </tc-calendar-row>
    `;

    document.querySelector(containerHead).innerHTML = "";

    let row = 1;
    let monthsIndex = 0;

    months.forEach((element) => {
        if(row === 1){
            monthsContent += `<tc-calendar-row class="tc-calendar-row-body-month calendar__active">`;
        }

        monthsContent += 
        `
            <tc-calendar-col class="tc-calendar-month button__selector__monthdate calendar__active" month="${monthsIndex}" year="${year}" target="${target}">
               ${ element }                 
            </tc-calendar-col>
        `;
        
        row++;

        if(row === 4){
            monthsContent += `</tc-calendar-row>`;
            row = 1;
        }

        monthsIndex++;
    });

    document.querySelector(containerMonth).innerHTML = monthsContent;
    handledEventCalendar();

};

const handledCalendar = ({
    containerDateSelection = "",
    containerSelectionCalendar = "",
    containerMonth = "", 
    containerDaysHead = "", 
    containerDaysBody = "", 
    date = null,
    event = null,
    dateSelected = null,
    target = ""
}) => {

    const dateInput = date ? [date.split('-')] : null;
    const dateSelectedArray = dateSelected ? [dateSelected.split(' / ')] : null;
    const now = !date ? new Date() : new Date(Number(dateInput[0][2]), Number(dateInput[0][1]) - 1, Number(dateInput[0][0]));
    const dateNow = !dateSelected ? new Date() : new Date(Number(dateSelectedArray[0][2]), Number(dateSelectedArray[0][1]) - 1, Number(dateSelectedArray[0][0]));
    let daysContent = "";
    let weekdaysContent = "";

    const days = [];

    const __dayNow = now.getDate();
    const __monthNow = now.getMonth();
    const __yearNow = now.getFullYear();
    const __weekDaySelection = (now.getDay() > 0 ? now.getDay() : 7) - 1;

    let __dayNowEvent;
    let __monthNowEvent;
    let __yearNowEvent; 
    let __weekDaySelectionEvent;

    if(event){
        __dayNowEvent = dateNow.getDate();
        __monthNowEvent = dateNow.getMonth();
        __yearNowEvent = dateNow.getFullYear();
        __weekDaySelectionEvent = (dateNow.getDay() > 0 ? dateNow.getDay() : 7) - 1;
    }

    const __dateFirstDay = new Date(__yearNow, __monthNow, 1);
    const __dateLastDay = new Date(__yearNow, __monthNow + 1, 0);
    const __daysLastMonth = __dateLastDay.getDate();

    const __weekdayFirst = __dateFirstDay.getDay() > 0 ? __dateFirstDay.getDay() : 7;
    const __weekdayLast = __dateLastDay.getDay() > 0 ? __dateLastDay.getDay() : 7;

    const __prevMonth = new Date(__yearNow, __monthNow - 1, 1);
    const __nextMonth = new Date(__yearNow, __monthNow + 1, 1);

    for(let i = 0; i < __weekdayFirst - 1; i++) {
        days[i] = "";
    }

    for(let j = __weekdayFirst; j <= __daysLastMonth + (__weekdayFirst - 1); j++) {
        days[j - 1] = j - (__weekdayFirst - 1);
    }

    if(__weekdayLast < 7) {
        for(let h = __weekdayLast; h < 7; h++) {
            days[days.length] = "";
        }
    }

    document.querySelector(containerDateSelection).innerHTML =
    `
        <tc-calendar-row class="calendar__active">
            <tc-calendar-col class="calendar__active">
                ${ !event ? weekDaysLegends[__weekDaySelection] : weekDaysLegends[__weekDaySelectionEvent] }
            </tc-calendar-col>
        </tc-calendar-row>
        <tc-calendar-row class="tc-calendar-row-title calendar__active">
            <tc-calendar-col class="calendar__active">
                <h1 class="calendar__active">
                    ${ !event ? __dayNow : __dayNowEvent }
                </h1>
            </tc-calendar-col>
        </tc-calendar-row>
        <tc-calendar-row class="tc-calendar-row-title calendar__active">
            <tc-calendar-col class="calendar__active">
                <h2 class="calendar__active">
                    ${ !event ? months[__monthNow] : months[__monthNowEvent] }
                </h2>
            </tc-calendar-col>
        </tc-calendar-row>
        <tc-calendar-row class="tc-calendar-row-title calendar__active">
            <tc-calendar-col class="calendar__active">
                <h3 class="calendar__active">
                    ${ !event ? __yearNow : __yearNowEvent }
                </h3>
            </tc-calendar-col>
        </tc-calendar-row>
    `;

    document.querySelector(containerSelectionCalendar).innerHTML = 
    `   
        <tc-calendar-row class="tc-calendar-row-menu calendar__active">
            <tc-calendar-col class="tc-calendar-col-left-arrow calendar__active button__prev__month" month="${__prevMonth.getMonth()}" year="${__prevMonth.getFullYear()}" target="${target}">
                <img src="img/left-arrow.svg" class="left-arrow calendar__active" month="${__prevMonth.getMonth()}" year="${__prevMonth.getFullYear()}" target="${target}"/>
            </tc-calendar-col>
            <tc-calendar-col class="tc-calendar-col-middle calendar__active button__months" year="${__yearNow}">
                ${ months[__monthNow] }
            </tc-calendar-col>
            <tc-calendar-col class="tc-calendar-col-middle calendar__active button__years" year="${__yearNow}">
                ${ __yearNow }
            </tc-calendar-col>
            <tc-calendar-col class="tc-calendar-col-right-arrow calendar__active button__next__month" month="${__nextMonth.getMonth()}" year="${__nextMonth.getFullYear()}" target="${target}">
                <img src="img/right-arrow.svg" class="right-arrow calendar__active" month="${__nextMonth.getMonth()}" year="${__nextMonth.getFullYear()}" target="${target}"/>
            </tc-calendar-col>
        </tc-calendar-row>
    `;

    document.querySelector(containerMonth).innerHTML = 
    `
        <tc-calendar-row class="tc-calendar-row-titles calendar__active">
            <tc-calendar-col class="calendar__active">
                Calendario ${monthsLegends[__monthNow]} ${__yearNow}
            </tc-calendar-col>
        </tc-calendar-row>
    `;

    weekDays.forEach((day) => {
        weekdaysContent += 
            `
                <tc-calendar-col class="calendar__active">
                    ${day}
                </tc-calendar-col>
            `
    });

    document.querySelector(containerDaysHead).innerHTML = 
    `
        <tc-calendar-row class="tc-calendar-row-header calendar__active">
            ${weekdaysContent}
        </tc-calendar-row>
    `;

    let row = 1;

    days.forEach((element) => {
        if(row === 1){
            daysContent += `<tc-calendar-row class="tc-calendar-row-body calendar__active">`;
        }

        daysContent += 
        `
            <tc-calendar-col class="${element !== "" ? `button__selector__date ${ element !== __dayNow ? `tc-calendar-day` : !event ? `tc-calendar-day-selection` : `tc-calendar-day` }` : ``} calendar__active" 
                                    ${element !== "" ? `day="${element}" month="${__monthNow}" year="${__yearNow}" target="${target}"` : ``}>
               ${ element }                 
            </tc-calendar-col>
        `;
        
        row++;

        if(row === 8){
            daysContent += `</tc-calendar-row>`;
            row = 1;
        }

    });

    document.querySelector(containerDaysBody).innerHTML = daysContent;
    handledEventCalendar();
};

export { handledCalendar, handledEventListenerCalendar };