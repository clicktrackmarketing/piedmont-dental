const SERVICE_AREAS = [
  "Piedmont",
  "Oakland",
  "Lake Merritt",
  "Montclair",
  "Rockridge",
  "Berkeley",
];

// Real Google Place: Piedmont Dental By Design — 1331 Grand Ave, Piedmont, CA 94610
// Place ID: ChIJRXRi3F2Hj4ARneUpH7lqi3I · Lat/Lng: 37.8205693, -122.2445268
const MAP_EMBED_URL =
  "https://maps.google.com/maps?q=Piedmont+Dental+By+Design,+1331+Grand+Ave,+Piedmont,+CA+94610&ll=37.8205693,-122.2445268&z=17&output=embed";
const MAP_DIRECTIONS_URL =
  "https://www.google.com/maps/dir/?api=1&destination=Piedmont+Dental+By+Design&destination_place_id=ChIJRXRi3F2Hj4ARneUpH7lqi3I";

export default function Visit() {
  return (
    <section className="visit" id="visit">
      <div className="visit-inner">
        <header className="section-head visit-head">
          <div>
            <div className="num">vii. — Visit</div>
            <h2>
              Visit us in <em>Piedmont.</em>
            </h2>
            <p className="visit-question">Where is Piedmont Dental By Design?</p>
          </div>
          <p className="lede">
            Piedmont Dental By Design is at <b>1331 Grand Avenue, Piedmont, CA
            94610</b> — about five minutes from MacArthur BART. Open Monday and
            Wednesday 7:00–5:00 and Tuesday and Thursday 7:00–3:00. Closed
            Friday through Sunday. We serve patients across the East Bay.
          </p>
        </header>

        <div className="visit-layout">
          <div className="visit-map">
            <iframe
              src={MAP_EMBED_URL}
              title="Map of Piedmont Dental By Design — 1331 Grand Ave, Piedmont CA"
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

          <div className="visit-details">
            <article className="visit-card">
              <div className="lbl">Address</div>
              <div className="val">
                1331 Grand Ave
                <br />
                Piedmont, CA 94610
              </div>
              <p className="meta">
                On Grand Avenue between Wildwood and Sunnyside · 5 minutes from
                MacArthur BART
              </p>
            </article>

            <article className="visit-card">
              <div className="lbl">Hours</div>
              <div className="val">
                Mon &amp; Wed · 7:00 – 5:00
                <br />
                Tue &amp; Thu · 7:00 – 3:00
              </div>
              <p className="meta">Friday – Sunday: closed</p>
            </article>

            <article className="visit-card">
              <div className="lbl">Phone</div>
              <div className="val">
                <a href="tel:5103503937">(510) 350-3937</a>
              </div>
              <p className="meta">
                Or text the practice — we usually reply within an hour during open
                hours.
              </p>
            </article>
          </div>
        </div>

        <div className="visit-areas">
          <span className="visit-areas-lbl">Patients travel from</span>
          <ul>
            {SERVICE_AREAS.map((area) => (
              <li key={area}>
                {area === "Oakland" ? <a href="/oakland">{area}</a> : area}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
