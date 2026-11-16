import SocialLinks from "@/components/SocialLinks";

type DayRow = { day: string; hours: string; closed?: boolean };

const SCHEDULE: DayRow[] = [
  { day: "Monday", hours: "7:00 AM – 5:00 PM" },
  { day: "Tuesday", hours: "7:00 AM – 3:00 PM" },
  { day: "Wednesday", hours: "7:00 AM – 5:00 PM" },
  { day: "Thursday", hours: "7:00 AM – 3:00 PM" },
  { day: "Friday", hours: "Closed", closed: true },
  { day: "Saturday", hours: "Closed", closed: true },
  { day: "Sunday", hours: "Closed", closed: true },
];

// Real Google Place: Piedmont Dental By Design — 1331 Grand Ave, Piedmont, CA 94610
// Place ID: ChIJRXRi3F2Hj4ARneUpH7lqi3I · Lat/Lng: 37.8205693, -122.2445268
const MAP_EMBED_URL =
  "https://maps.google.com/maps?q=Piedmont+Dental+By+Design,+1331+Grand+Ave,+Piedmont,+CA+94610&ll=37.8205693,-122.2445268&z=17&output=embed";
const MAP_DIRECTIONS_URL =
  "https://www.google.com/maps/dir/?api=1&destination=Piedmont+Dental+By+Design&destination_place_id=ChIJRXRi3F2Hj4ARneUpH7lqi3I";

export default function ContactDetails() {
  return (
    <section className="contact-details" id="details">
      <div className="contact-details-inner">
        <header className="section-head contact-details-head">
          <div>
            <div className="num">i. — Visit & Hours</div>
            <h2>
              Where to find us, <em>when we&apos;re open.</em>
            </h2>
            <p className="about-question">When can I drop by?</p>
          </div>
          <p className="lede">
            Open Monday through Thursday — closed Friday through Sunday. The
            practice sits on Grand Avenue, about a five-minute drive from
            MacArthur BART.
          </p>
        </header>

        <div className="contact-layout">
          <div className="contact-map">
            <iframe
              src={MAP_EMBED_URL}
              title="Map of Piedmont Dental By Design"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
            <a
              className="visit-map-cta"
              href={MAP_DIRECTIONS_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              Get directions →
              <span className="sr-only"> (opens in a new window)</span>
            </a>
          </div>

          <div className="contact-schedule">
            <h3 className="contact-schedule-head">Opening hours</h3>
            <ul>
              {SCHEDULE.map((d) => (
                <li
                  key={d.day}
                  className={d.closed ? "is-closed" : "is-open"}
                >
                  <span className="day">{d.day}</span>
                  <span className="hours">{d.hours}</span>
                </li>
              ))}
            </ul>
            <p className="contact-schedule-note">
              Same-week openings are available most weeks. Call{" "}
              <a href="tel:5103503937">(510) 350-3937</a> or{" "}
              <a href="#form">send a message</a>.
            </p>
            <SocialLinks variant="card" />
          </div>
        </div>
      </div>
    </section>
  );
}
