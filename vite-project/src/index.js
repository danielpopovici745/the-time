// querySelectors to grab the HTML element in order to edit it's text
let timeZone = document.querySelector(".timeZoneContainer > h3");
let time = document.querySelector(".content > h1");
let date = document.querySelector(".content > h3");
let select = document.getElementById("timezones");
let changeTimezone = document.querySelector(".changeTimezone");

// from dayjs documentation, this how to to import plugins into browser
dayjs.extend(window.dayjs_plugin_localizedFormat);

dayjs.extend(window.dayjs_plugin_timezone);

dayjs.extend(window.dayjs_plugin_utc);

//changing textContent for each HTML element

timeZone.textContent = dayjs.tz.guess();

time.textContent = dayjs().format("LTS");

date.textContent = dayjs().format("dddd, LL");

//Modal stuff
document.addEventListener("DOMContentLoaded", () => {
	MicroModal.init();
	MicroModal.show("modal-1");
	MicroModal.close("modal-1");
});

//dropdown for timezones
let timezones = Intl.supportedValuesOf("timeZone");
timezones.forEach((element) => {
	let option = document.createElement("option");
	option.value = element;
	option.textContent = element;
	select.appendChild(option);
});

//once a different tz is selected, the function below changes the time and date with dayjs plugin timezone and UTC.
changeTimezone.addEventListener("click", changeDateTime);

changeTimezone.addEventListener("touchend", changeDateTime);

function changeDateTime() {
	timeZone.textContent = select.value;
	time.textContent = dayjs().tz(timeZone.textContent).format("LTS");
	date.textContent = dayjs().tz(timeZone.textContent).format("dddd, LL");
}
