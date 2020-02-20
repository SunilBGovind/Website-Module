function searchPatternMatch() {
    event.preventDefault();
    var validPattern = /^[0-9a-zA-Z !=@.#%^/&*$<>?,'";:-]+$/;
    console.log("Checking Pattern Match...........");
    var pattern = document.getElementById("s").value;
    var currentForm = document.getElementById("cur_frm").value;
    console.log("Checking Pattern..........." + pattern);
    console.log("currentForm ..........." + currentForm);

    if (validPattern.test(pattern)) {//validating search pattern.
        //Action URL's(en and ja) configurations start here..
        if (currentForm == "home") {
            document.getElementById("searchform").action = "en/render_template/index.html?pattern=" + pattern;
        } else if (currentForm == "profile" || currentForm == "capability" || currentForm == "downloads" || currentForm == "downloads-ja" || currentForm == "latest_news" || currentForm == "quality_gallery" || currentForm == "quality_gallery-ja" || currentForm == "latest_events" || currentForm == "certifications_gallery" || currentForm == "certifications_gallery-ja" || currentForm == "latest_events-ja" || currentForm == "latest_news-ja") {
            document.getElementById("searchform").action = "../../render_template/index.html?pattern=" + pattern;
        } else if (currentForm == "ksd_center" || currentForm == "sector_served" || currentForm == "infrastructure" || currentForm == "infrastructure-ja" || currentForm == "quality" || currentForm == "careers" || currentForm == "careers-ja" || currentForm == "contact" || currentForm == "contact-ja" || currentForm == "suppliers" || currentForm == "suppliers-ja" || currentForm == "group_companies-ja" || currentForm == "group_companies" || currentForm == "reach_us" || currentForm == "reach_us-ja" || currentForm == "news" || currentForm == "news-ja" || currentForm == "events-ja" || currentForm == "events" || currentForm == "awards" || currentForm == "awards-ja" || currentForm == "certifications" || currentForm == "certifications-ja" || currentForm == "railways" || currentForm == "sector_served-ja" || currentForm == "quality-ja" || currentForm == "railways-ja") {
            document.getElementById("searchform").action = "../render_template/index.html?pattern=" + pattern;
        } else if (currentForm == "services" || currentForm == "gallery" || currentForm == "corporate_gallery" || currentForm == "services-ja") {
            document.getElementById("searchform").action = "../../../render_template/index.html?pattern=" + pattern;
        } else if (currentForm == "system_integration" || currentForm == "priduct_service" || currentForm == "products" || currentForm == "system_integration-ja" || currentForm == "priduct_service-ja" || currentForm == "products-ja") {
            document.getElementById("searchform").action = "../../render_template/index.html?pattern=" + pattern;
        } else if (currentForm == "services_gallery" || currentForm == "services_gallery-ja") {
            document.getElementById("searchform").action = "../../../../render_template/index.html?pattern=" + pattern;
        }


        if (currentForm == "home-ja") {
            document.getElementById("searchform").action = "../ja/render_template/index.html?pattern=" + pattern;
        } else if (currentForm == "profile-ja" || currentForm == "capability-ja") {
            document.getElementById("searchform").action = "../../render_template/index.html?pattern=" + pattern;
        } else if (currentForm == "ksd_center-ja") {
            document.getElementById("searchform").action = "../render_template/index.html?pattern=" + pattern;
        }

    } else {
	if (currentForm == "home") {
            document.getElementById("searchform").action = "en/render_template/index.html?pattern=" + pattern;
        }
        if (currentForm == "home-ja") {
            document.getElementById("searchform").action = "render_template/index.html?pattern=" + pattern;
        } else if (currentForm == "profile-ja" || currentForm == "profile" || currentForm == "capability-ja" || currentForm == "downloads-ja" || currentForm == "quality_gallery-ja" || currentForm == "quality_gallery" || currentForm == "capability" || currentForm == "downloads") {
            document.getElementById("searchform").action = "../../render_template/index.html?pattern=" + pattern;
        } else if (currentForm == "ksd_center-ja" || currentForm == "sector_served-ja" || currentForm == "sector_served" || currentForm == "infrastructure-ja" || currentForm == "quality-ja" || currentForm == "quality" || currentForm == "careers-ja" || currentForm == "careers" || currentForm == "contact-ja" || currentForm == "contact" || currentForm == "suppliers-ja" || currentForm == "suppliers" || currentForm == "group_companies-ja" || currentForm == "group_companies" || currentForm == "reach_us" || currentForm == "reach_us-ja" || currentForm == "news-ja" || currentForm == "news" || currentForm == "events-ja" || currentForm == "events" || currentForm == "railways-ja" || currentForm == "awards-ja" || currentForm == "certifications-ja" || currentForm == "certifications" || currentForm == "ksd_center" || currentForm == "sector_served" || currentForm == "infrastructure" || currentForm == "awards") {
            document.getElementById("searchform").action = "../render_template/index.html?pattern=" + pattern;
        } else if (currentForm == "services-ja" || currentForm == "services" || currentForm == "gallery" || currentForm == "corporate_gallery") {
            document.getElementById("searchform").action = "../../../render_template/index.html?pattern=" + pattern;
        } else if (currentForm == "services_gallery-ja") {
            document.getElementById("searchform").action = "../../../../render_template/index.html?pattern=" + pattern;
        } else if (currentForm == "system_integration-ja" || currentForm == "priduct_service-ja" || currentForm == "products-ja" || currentForm == "products" || currentForm == "latest_events-ja" || currentForm == "latest_news-ja" || currentForm == "latest_events" || currentForm == "latest_news" || currentForm == "certifications_gallery-ja" || currentForm == "certifications_gallery" || currentForm == "system_integration" || currentForm == "priduct_service") {
            document.getElementById("searchform").action = "../../render_template/index.html?pattern=" + pattern;
        }
    }

    document.getElementById("searchform").submit();
} //end of searchPatternMatch..
