function MainAssistant() {}
MainAssistant.prototype.setup = function() {};

MainAssistant.prototype.activate = function(event) {
	this.wallImport();		
};

MainAssistant.prototype.wallImport = function() {
	
$("txt").innerHTML = "Importing wallpaper...";

	// in the below service request, you could use
	// file:///media/internal/downloads/01.png
	// for a file on the USB drive instead of an image from within your app
	// must be a .jpg or .png
	
	this.controller.serviceRequest('palm://com.palm.systemservice/wallpaper',
		{
			method:"importWallpaper",
			parameters:{"target": Mojo.appPath + "images/wallpaper.png"},
			onSuccess: this.wallSet.bind(this),
			onFailure: this.wallImportFailure.bind(this)
		}
	);
	
$("txt").innerHTML = "Import request made...";

}

MainAssistant.prototype.wallImportFailure = function() {
$("txt").innerHTML = "Wallpaper import failed.";
}

MainAssistant.prototype.wallSet = function(returnObj) {
	
$("txt").innerHTML = "Got the wallpaper object. Setting as wallpaper...";

	var wallpaperObj = returnObj.wallpaper;
	
	this.controller.serviceRequest('palm://com.palm.systemservice',
		{
			method:"setPreferences",
			parameters:{"wallpaper":wallpaperObj},
			onSuccess: this.wallSetSuccess.bind(this),
			onFailure: this.wallSetFailure.bind(this)
		}
	);
	
$("txt").innerHTML = "Set prefs called for setting wallpaper...";

}

MainAssistant.prototype.wallSetSuccess = function(returned) {
$("txt").innerHTML = "Wallpaper successfully set.";
}

MainAssistant.prototype.wallSetFailure = function(returned) {
$("txt").innerHTML = "Wallpaper set failed.";
}

MainAssistant.prototype.deactivate = function(event) {};
MainAssistant.prototype.cleanup = function(event) {};
