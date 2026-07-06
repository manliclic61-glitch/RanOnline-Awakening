import { ArrowRight } from "lucide-react";
import downloadBackground from "../../assets/739012693_122118871461354341_236593273800252475_n.jpg";
import { useDownloadItems, serverFlag } from "./siteData";

export default function DownloadSection() {
  const { data: downloadItems, status } = useDownloadItems();

  return (
    <section
      className="iv-section band iv-download-section"
      id="download"
      style={{ "--download-bg": `url(${downloadBackground})` }}
    >
      <div className="iv-container">
        <div className="iv-section-head">
          <div>
            <div className="iv-section-kicker">Download Page</div>
            <h2 className="iv-display">I-Download mona!</h2>
          </div>

          <p className="iv-section-sub">
            Choose a mirror below to download the RAN Online: Awakening client.
            Mega and Google Drive links can be updated anytime.
          </p>
        </div>

        {status === "loading" && (
          <p className="iv-download-loading">Loading downloads...</p>
        )}

        {status === "error" && (
          <p className="iv-download-error">
            Failed to load download links.
          </p>
        )}

        {status === "ready" && (
          <div className="iv-download-grid">
            {downloadItems.map((item) => {
              const Icon = item.icon;

              return (
                <article className="iv-download-card" key={item.title}>
                  <div className="iv-download-icon">
                    <Icon size={23} />
                  </div>

                  <small>{item.meta}</small>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>

                  {serverFlag ? (
                    <a href={item.href} target="_blank" rel="noreferrer">
                      Download Now! <ArrowRight size={15} />
                    </a>
                  ) : (
                    <span
                      className="iv-download-disabled"
                      aria-disabled="true"
                    >
                      Coming Soon
                    </span>
                  )}
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}