<?php
header('Content-type: application/x-web-app-manifest+json');
?>
{ 
   "version": "1.0",
   "name": "Simox", 
   "description": "Simon, the classic electronic game of memory skill now for Firefox OS devices.", 
   "launch_path": "/index.html", 
   "developer": { "name": "amatucla", "url": "http://www.palasaka.com" }, 
   "icons": { 
		"32": "/img/icon32.png", 
		"60": "/img/icon60.png", 
		"90": "/img/icon90.png", 
		"114": "/img/icon114.png", 
		"120": "/img/icon120.png", 
		"128": "/img/icon128.png",
		"220": "/img/icon220.png",
        "256": "/img/icon256.png"
	},
	"installs_allowed_from": ["*"],
	"default_locale": "en",
	"fullscreen": "true",
	"orientation": ["portrait-primary"]
}
