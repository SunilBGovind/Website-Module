/*
place ={
		infowin_html: content of infowindow,
		tooltip_html: content of tooltip,
		position:{lat:latitude, lng:longitude}
		
}
*/
var places =Array();

//places.push({infowin_html:"<h3>UNIT</h3>Mysore - 1 <h3>Sector</h3>INDUSTRIAL / RAILWAYS / MEDICAL / MAGNETICS / <br> WIRE-HARNESS / DEFENS<br> <h3>PLANT CAPACITY </h3>4600 m2 <br> Export & domesticHigh end facility with end to end capabilities<h3>CERTIFICATES</h3>ISO/TS 16949:2009<br> IS0 9001:2008 <br> ISO 14001:2004 <br> ISO 18001:2007<br> ISO 13485 <br> ISO EN/AS 9100<br> IRIS <br> <h3>CONTACT</h3>commercial@kaynestechnology.net",tooltip_html:"<h3>KAYNES - Mysore</h3><div></div>", position:{lat:31.104829, lng:77.173390}});

places.push({infowin_html:"<h3>UNIT</h3>Mysore - I <h3>SECTOR</h3>INDUSTRIAL / RAILWAYS / MEDICAL / MAGNETICS / <br> WIRE-HARNESS / DEFENS<br> <h3>PLANT CAPACITY </h3>4600 m2 <br> Export & domesticHigh end facility with end to end capabilities<h3>CERTIFICATES</h3>ISO/TS 16949:2009<br> IS0 9001:2008 <br> ISO 14001:2004 <br> ISO 18001:2007<br> ISO 13485 <br> ISO EN/AS 9100<br> IRIS <br> <h3>CONTACT</h3>commercial@kaynestechnology.net",tooltip_html:"<h3>Kaynes - Mysore I</h3><div></div>", position:{lat:12.295810, lng:76.639381}});

places.push({infowin_html:"<h3>UNIT</h3>Mysore - II <h3>SECTOR</h3>IAUTO / INDUSTRIAL<h3>PLANT CAPACITY </h3>2500 m2<br>Large concentration of job works and high volume low value jobs.<br>Testing facility not available <h3>CERTIFICATES</h3>IS0 9001:2008 <br> ISO 13485<h3>CONTACT</h3>commercial@kaynestechnology.net",tooltip_html:"<h3>Kaynes - Mysore II</h3><div></div>", position:{lat:12.361441, lng:76.500833}});

places.push({infowin_html:"<h3>UNIT</h3>Bangalore<h3>SECTOR</h3>DEFENCE & INSDUSTRIAL WIRING HARNESS, POWER DISTRIBUTION CUBICLES<h3>PLANT CAPACITY </h3>2000 m2<br>Testing facility not available<h3>CONTACT</h3>ramaprasad@kaynestechnology.net<br>commercial@kaynestechnology.net",tooltip_html:"<h3>Kaynes - Bangalore</h3><div></div>",tooltip_html:"<h3>Kaynes - Bangalore</h3><div></div>",position:{lat:12.971599, lng:77.594563}});

places.push({infowin_html:"<h3>UNIT</h3>Parwanoo<h3>SECTOR</h3>IT HARDWARE / INDUSTRIAL<h3>PLANT CAPACITY </h3>600 m2<br>High concentration of low value jobs and box build orders<h3>CONTACT</h3>prajith@kaynestechnology.net<br>commercial@kaynestechnology.net",tooltip_html:"<h3>Kaynes - Parwanoo</h3><div></div>", position:{lat:30.837164, lng:76.961426}});

places.push({infowin_html:"<h3>UNIT</h3>Selaqui<h3>SECTOR</h3>IT HARDWARE / INDUSTRIAL<h3>PLANT CAPACITY </h3>500 m2 High concentrationof low value jobs<h3>CONTACT</h3>commercial@kaynestechnology.net",tooltip_html:"<h3>Kaynes - Selaqui</h3><div></div>",position:{lat:30.368158, lng:77.865313}});

places.push({infowin_html:"<h3>UNIT</h3>Manasar<h3>SECTOR</h3>AUTO/ INDUSTRIAL <h3>PLANT CAPACITY </h3>1450m2<br> High concentration in automotive sector and high concentration of job works<h3>CERTIFICATES</h3>ISO/TS 16949:2009<br>IS0 9001:2008<br>ISO 14001:2004<br>ISO 18001:2007<h3>CONTACT</h3>rakesh.jha@kaynestechnology.net<br>commercial@kaynestechnology.net",tooltip_html:"<h3>Kaynes - Manasar</h3><div></div>",position:{lat:27.179166, lng:73.709537}});

places.push({infowin_html:"<h3>UNIT</h3>Chennai<h3>SECTOR</h3>RELAY, INDUSTRIAL WIRE HARNESS, MAGNETICS <h3>PLANT CAPACITY </h3>1000 m2<br>Export & DomesticHigh concentration of low price jobs<h3>CONTACT</h3>baby@kaynestechnology.net<br>commercial@kaynestechnology.net",tooltip_html:"<h3>Kaynes - Chennai</h3><div></div>",position:{lat:13.082680, lng:80.270718}});

places.push({infowin_html:"<h3>UNIT</h3>Mumbai<h3>SECTOR</h3>ALL VERTICALS <h3>PLANT CAPACITY </h3>Service centre for all verticals<h3>CERTIFICATES</h3>IS0 9001:2008<h3>CONTACT</h3>girish@kaynestechnology.net <br>commercial@kaynestechnology.net ",tooltip_html:"<h3>Kaynes - Mumbai</h3><div></div>",position:{lat:19.075984, lng:72.877656}});

places.push({infowin_html:"<h3>UNIT</h3>Cochin<h3>SECTOR</h3>SMART CITY PROJECTS<br>SECURITY AND SURVEILANCE SYSTEMS<br>MARITIME SYSTEMS AND REPAIRS<h3>PLANT CAPACITY</h3>modern facilities for Systems Integration, System Simulation, Instru.ments Calibration,  Electronics Systems Laboratory<h3>CONTACT</h3>ravi.iype@kaynestechnology.net <br>commercial@kaynestechnology.net ",tooltip_html:"<h3>Kaynes - Cochin</h3><div></div>",position:{lat:9.931233, lng:76.267304}});

places.push({infowin_html:"<h3>UNIT</h3>Kemsys<h3>SECTOR</h3>HARD WARE DESIGN<br>SOFTWARE DESIGN<br>MECHANICAL SERVICES<br>CERTIFICATIONS<h3>CONTACT</h3>ramaprasad@kaynestechnology.net) ",tooltip_html:"<h3>Kemsys - Bangalore</h3><div></div>",position:{lat:13.018529, lng:77.654430}});

places.push({infowin_html:"<h3>Kaynes Technology Inc</h3>471 Hobson Avenue, Saddle Brook, NJ 07663, USA<h3>CONTACT</h3>Commercial@kaynestechnology.net",tooltip_html:"<h3>Kaynes  - USA</h3><div></div>",position:{lat:40.899577, lng:-74.100555}});

places.push({infowin_html:"<h3>Mrs. Jonna Rehhoff-Nor</h3>Alsion 2, DK-6400 Sonderborg, Denmark<h3>CONTACT</h3>jrn@kaynestechnology.ch",tooltip_html:"<h3>Kaynes  - USA</h3><div></div>",position:{lat:54.913046, lng:9.778901}});



