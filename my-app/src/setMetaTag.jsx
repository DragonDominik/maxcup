import { useEffect } from "react";

export const useMetaTags = (translations, lang) => {
  useEffect(() => {
    // ----- Page Title -----
    document.title = translations[lang].page.title;

    // ----- Meta Description -----
    let meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.setAttribute("content", translations[lang].page.description);
    } else {
      meta = document.createElement("meta");
      meta.name = "description";
      meta.content = translations[lang].page.description;
      document.head.appendChild(meta);
    }

    // ----- Open Graph Tags -----
    const ogTags = [
      { property: "og:title", content: translations[lang].page.title },
      { property: "og:description", content: translations[lang].page.description },
      { property: "og:url", content: `https://maxcup.hu/${lang.toLowerCase()}` },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "MAX CUP" },
    ];

    ogTags.forEach(tag => {
      let ogMeta = document.querySelector(`meta[property="${tag.property}"]`);
      if (ogMeta) {
        ogMeta.setAttribute("content", tag.content);
      } else {
        ogMeta = document.createElement("meta");
        ogMeta.setAttribute("property", tag.property);
        ogMeta.setAttribute("content", tag.content);
        document.head.appendChild(ogMeta);
      }
    });

    // ----- Twitter Card Tags -----
    const twitterTags = [
      { name: "twitter:title", content: translations[lang].page.title },
      { name: "twitter:description", content: translations[lang].page.description },
    ];

    twitterTags.forEach(tag => {
      let twitterMeta = document.querySelector(`meta[name="${tag.name}"]`);
      if (twitterMeta) {
        twitterMeta.setAttribute("content", tag.content);
      } else {
        twitterMeta = document.createElement("meta");
        twitterMeta.setAttribute("name", tag.name);
        twitterMeta.setAttribute("content", tag.content);
        document.head.appendChild(twitterMeta);
      }
    });
  }, [translations, lang]);
};
