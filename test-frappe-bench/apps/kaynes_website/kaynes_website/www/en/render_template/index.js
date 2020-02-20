var urlParams = new URLSearchParams(window.location.search);
var entries = urlParams.entries();
var validPattern = /^[0-9a-zA-Z !=@.#%^/&*$<>?,'";:-]+$/;
var language_type = "";
for (entry of entries) {
    var pattern = entry[1];
    if (validPattern.test(pattern)) {
		language_type = "en";
	}else{
		language_type = "ja";
	}

    frappe.call({//Search Pattern results configurations..
        method: "kaynes_website.www.utils.checkPatternMatch",
        args: {
            "pattern": pattern,
	    "language": language_type
        },
        async: false,
        callback: function(r) {
            var templateList = r.message;
            var entry_div = document.getElementById('entry-content');
            var head_div = document.getElementById('headtag');

            if (Object.keys(templateList).length != 0) {
                for (const [key, value] of Object.entries(templateList)) {
                    entry_div.innerHTML += "<p>" + value + "<a href=" + key + " target='_blank'> ... Continue reading <span class='meta-nav'>→</span></a></p>";
                }

                head_div.innerHTML = 'Search Results for: ' + pattern;
            } else {
                head_div.innerHTML = 'Nothing Found for: ' + pattern;
                entry_div.innerHTML += '<p> Sorry, but nothing matched your search criteria. Please try again with some different keywords.</p>'
            }

        } // end of callback..
    }); //end of frappe..
} //end of entries..
