if (typeof window.awf_Form_=='undefined') window.awf_Form_ = new Object();
awf_Form_.isPreview = false;
awf_Form_.setCookie = function(name, value, expires, path, domain, secure) {
    var curCookie = name + "=" + escape(value) +
        ((expires) ? "; expires=" + expires.toGMTString() : "") +
        ((path) ? "; path=" + path : "") +
        ((domain) ? "; domain=" + domain : "") +
        ((secure) ? "; secure" : "");
    document.cookie = curCookie;
}

awf_Form_.getCookie = function(name) {
    var dc = document.cookie;
    var prefix = name + "=";
    var begin = dc.indexOf("; " + prefix);
    if (begin == -1) {
        begin = dc.indexOf(prefix);
        if (begin != 0) return null;
    } else
        begin += 2;
    var end = document.cookie.indexOf(";", begin);
    if (end == -1)
        end = dc.length;
    return unescape(dc.substring(begin + prefix.length, end));
}
awf_Form_.showForm = function() {
    /*@cc_on
     /*@if (@_jscript_version > 5.5)
     var isIE = true;
     @else
     var deprecatedBrowser = true;
     @end @*/
    if (typeof isIE == 'undefined') {
        var isIE = false;
    }
    if (!isIE && !window.XMLHttpRequest) {
        var deprecatedBrowser = true;
    }

// Exit early for TY Landing Page option
    if (document.location.href.indexOf('meta_web_form_id') > 0) return;

    if (deprecatedBrowser) {
        window.open('https://forms.aweber.com/form/94/158786994.html','winPopUp','resizable=1,scrollbars=1,location=0,width=299,height=382');
        awf_Form_.setExpirationCookie();
        return true;
    }
    if (typeof awf_Form_.scriptAppended=='undefined') {
        try {
            var script = document.createElement('script');
            script.src = "https://forms.aweber.com/form/styled_popovers_and_lightboxes.js";
            script.type = 'text/javascript';
            document.getElementsByTagName('HEAD')[0].appendChild(script);
        } catch(e) {
//IE5 for Mac and IE timeout issues
            try {
                document.write('<script type="text/javascript" src="' + src + '"></scr'+'ipt>');
            } catch(e) { }
        }
        awf_Form_.scriptAppended = true;
    }
    var loadForm = function() {
        awf_Form_.form = new awf_Form_.AWFormGenerator( {"_log":null,"id":158786994,"form":"<form method=\"post\" class=\"af-form-wrapper\" accept-charset=\"UTF-8\" action=\"https:\/\/www.aweber.com\/scripts\/addlead.pl\"  >\n<div style=\"display: none;\">\n<input type=\"hidden\" name=\"meta_web_form_id\" value=\"158786994\" \/>\n<input type=\"hidden\" name=\"meta_split_id\" value=\"\" \/>\n<input type=\"hidden\" name=\"listname\" value=\"awlist3946672\" \/>\n<input type=\"hidden\" name=\"redirect\" value=\"\" id=\"redirect_46e82c4266f56c66a6bef9f9e39fa948\" \/>\n\n<input type=\"hidden\" name=\"meta_adtracking\" value=\"Overlay_Configurateur\" \/>\n<input type=\"hidden\" name=\"meta_message\" value=\"1001\" \/>\n<input type=\"hidden\" name=\"meta_required\" value=\"name,email\" \/>\n\n<input type=\"hidden\" name=\"meta_tooltip\" value=\"\" \/>\n<\/div>\n<div id=\"af-form-158786994\" class=\"af-form\"><div id=\"af-header-158786994\" class=\"af-header\"><div class=\"bodyText\"><p>&nbsp;<\/p><\/div><\/div>\n<div id=\"af-body-158786994\" class=\"af-body af-standards\">\n<div class=\"af-element\">\n<label class=\"previewLabel\" for=\"awf_field-75022752\">Name: <\/label>\n<div class=\"af-textWrap\">\n<input id=\"awf_field-75022752\" type=\"text\" name=\"name\" class=\"text\" value=\"\"  onfocus=\" if (this.value == '') { this.value = ''; }\" onblur=\"if (this.value == '') { this.value='';} \" tabindex=\"500\" \/>\n<\/div>\n<div class=\"af-clear\"><\/div><\/div>\n<div class=\"af-element\">\n<label class=\"previewLabel\" for=\"awf_field-75022753\">Email: <\/label>\n<div class=\"af-textWrap\"><input class=\"text\" id=\"awf_field-75022753\" type=\"text\" name=\"email\" value=\"\" tabindex=\"501\" onfocus=\" if (this.value == '') { this.value = ''; }\" onblur=\"if (this.value == '') { this.value='';} \" \/>\n<\/div><div class=\"af-clear\"><\/div>\n<\/div>\n<div class=\"af-element buttonContainer\">\n<input name=\"submit\" id=\"af-submit-image-158786994\" type=\"image\" class=\"image\" style=\"background: none; max-width: 100%;\" alt=\"Submit Form\" src=\"http:\/\/aweber.com\/images\/forms\/plain\/buttons\/grey.png\" tabindex=\"502\" \/>\n<div class=\"af-clear\"><\/div>\n<\/div>\n<div class=\"af-element privacyPolicy\" style=\"text-align: center\"><p>We respect your <a title=\"Privacy Policy\" href=\"https:\/\/www.aweber.com\/permission.htm\" target=\"_blank\" rel=\"nofollow\">email privacy<\/a><\/p>\n<div class=\"af-clear\"><\/div>\n<\/div>\n<div class=\"af-element poweredBy\" style=\"text-align: center; font-size: 9px;\"><p><a href=\"https:\/\/www.aweber.com\" title=\"AWeber Email Marketing\" target=\"_blank\" rel=\"nofollow\">Powered by AWeber Email Marketing<\/a><\/p>\n<div class=\"af-clear\"><\/div>\n<\/div>\n<\/div>\n<div id=\"af-footer-158786994\" class=\"af-footer\"><div class=\"bodyText\"><p>&nbsp;<\/p><\/div><\/div>\n<\/div>\n<\/form>\n","styles":"#af-form-158786994 .af-body .af-textWrap{width:98%;display:block;float:none;}\n#af-form-158786994 .af-body .privacyPolicy{color:#CCCCCC;font-size:11px;font-family:Verdana, sans-serif;}\n#af-form-158786994 .af-body a{color:#CCCCCC;text-decoration:underline;font-style:normal;font-weight:normal;}\n#af-form-158786994 .af-body input.text, #af-form-158786994 .af-body textarea{background-color:#FFFFFF;border-color:#D9D9D9;border-width:1px;border-style:solid;color:#C7C7C7;text-decoration:none;font-style:normal;font-weight:normal;font-size:24px;font-family:Trebuchet MS, sans-serif;}\n#af-form-158786994 .af-body input.text:focus, #af-form-158786994 .af-body textarea:focus{background-color:#FFFAD6;border-color:#030303;border-width:1px;border-style:solid;}\n#af-form-158786994 .af-body label.previewLabel{display:block;float:none;text-align:left;width:auto;color:#CCCCCC;text-decoration:none;font-style:normal;font-weight:normal;font-size:24px;font-family:Helvetica, sans-serif;}\n#af-form-158786994 .af-body{padding-bottom:15px;padding-top:15px;background-repeat:no-repeat;background-position:inherit;background-image:none;color:#CCCCCC;font-size:11px;font-family:Verdana, sans-serif;}\n#af-form-158786994 .af-footer{padding-right:15px;padding-left:15px;background-color:#FFFFFF;background-repeat:no-repeat;background-position:top left;background-image:none;border-width:1px;border-bottom-style:none;border-left-style:none;border-right-style:none;border-top-style:none;color:#CCCCCC;font-size:12px;font-family:Verdana, sans-serif;}\n#af-form-158786994 .af-header{padding-bottom:9px;padding-top:9px;padding-right:10px;padding-left:10px;background-color:#FFFFFF;background-repeat:no-repeat;background-position:inherit;background-image:none;border-width:1px;border-bottom-style:none;border-left-style:none;border-right-style:none;border-top-style:none;color:#CCCCCC;font-size:16px;font-family:Verdana, sans-serif;}\n#af-form-158786994 .af-quirksMode .bodyText{padding-top:2px;padding-bottom:2px;}\n#af-form-158786994 .af-quirksMode{padding-right:60px;padding-left:60px;}\n#af-form-158786994 .af-standards .af-element{padding-right:60px;padding-left:60px;}\n#af-form-158786994 .bodyText p{margin:1em 0;}\n#af-form-158786994 .buttonContainer input.submit{background-color:#0479c2;background-image:url(\"http:\/\/aweber.com\/images\/forms\/plain\/buttons\/grey.png\");color:#FFFFFF;text-decoration:none;font-style:normal;font-weight:normal;font-size:24px;font-family:Helvetica, sans-serif;}\n#af-form-158786994 .buttonContainer input.submit{width:auto;}\n#af-form-158786994 .buttonContainer{text-align:center;}\n#af-form-158786994 body,#af-form-158786994 dl,#af-form-158786994 dt,#af-form-158786994 dd,#af-form-158786994 h1,#af-form-158786994 h2,#af-form-158786994 h3,#af-form-158786994 h4,#af-form-158786994 h5,#af-form-158786994 h6,#af-form-158786994 pre,#af-form-158786994 code,#af-form-158786994 fieldset,#af-form-158786994 legend,#af-form-158786994 blockquote,#af-form-158786994 th,#af-form-158786994 td{float:none;color:inherit;position:static;margin:0;padding:0;}\n#af-form-158786994 button,#af-form-158786994 input,#af-form-158786994 submit,#af-form-158786994 textarea,#af-form-158786994 select,#af-form-158786994 label,#af-form-158786994 optgroup,#af-form-158786994 option{float:none;position:static;margin:0;}\n#af-form-158786994 div{margin:0;}\n#af-form-158786994 fieldset{border:0;}\n#af-form-158786994 form,#af-form-158786994 textarea,.af-form-wrapper,.af-form-close-button,#af-form-158786994 img{float:none;color:inherit;position:static;background-color:none;border:none;margin:0;padding:0;}\n#af-form-158786994 input,#af-form-158786994 button,#af-form-158786994 textarea,#af-form-158786994 select{font-size:100%;}\n#af-form-158786994 p{color:inherit;}\n#af-form-158786994 select,#af-form-158786994 label,#af-form-158786994 optgroup,#af-form-158786994 option{padding:0;}\n#af-form-158786994 table{border-collapse:collapse;border-spacing:0;}\n#af-form-158786994 ul,#af-form-158786994 ol{list-style-image:none;list-style-position:outside;list-style-type:disc;padding-left:40px;}\n#af-form-158786994,#af-form-158786994 .quirksMode{width:100%;max-width:299px;}\n#af-form-158786994.af-quirksMode{overflow-x:hidden;}\n#af-form-158786994{background-color:#FFFFFF;border-color:#CFCFCF;border-width:1px;border-style:none;}\n#af-form-158786994{display:block;}\n.af-body .af-textWrap{text-align:left;}\n.af-body input.image{border:none!important;}\n.af-body input.submit,.af-body input.image,.af-form .af-element input.button{float:none!important;}\n.af-body input.text{width:100%;float:none;padding:2px!important;}\n.af-body.af-standards input.submit{padding:4px 12px;}\n.af-clear{clear:both;}\n.af-element label{text-align:left;display:block;float:left;}\n.af-element{padding:5px 0;}\n.af-form-wrapper{text-indent:0;}\n.af-form{text-align:left;margin:auto;}\n.af-header,.af-footer{margin-bottom:0;margin-top:0;padding:10px;}\n.af-quirksMode .af-element{padding-left:0!important;padding-right:0!important;}\n.dropShadowBottom158786994{background:url(https:\/\/forms.aweber.com\/images\/wfg\/drop-bottom.png) repeat-x;width:297px;height:10px;float:left;margin-bottom:0;line-height:0;font-size:0;padding:0;}\n.dropShadowL158786994{background:url(https:\/\/forms.aweber.com\/images\/wfg\/drop-left.png) repeat-y;line-height:0;font-size:0;width:10px;height:100%;float:left;margin-bottom:0;}\n.dropShadowLL158786994{background:url(https:\/\/forms.aweber.com\/images\/wfg\/drop-bottomLeft.png) no-repeat;width:10px;height:10px;float:left;margin-bottom:0;line-height:0;font-size:0;padding:0;}\n.dropShadowLR158786994{background:url(https:\/\/forms.aweber.com\/images\/wfg\/drop-bottomRight.png) no-repeat;width:10px;height:10px;float:left;margin-bottom:0;line-height:0;font-size:0;padding:0;}\n.dropShadowR158786994{background:url(https:\/\/forms.aweber.com\/images\/wfg\/drop-right.png) repeat-y;width:10px;height:100%;float:right;margin-bottom:0;}\n.dropShadowTop158786994{background:url(https:\/\/forms.aweber.com\/images\/wfg\/drop-top.png) repeat-x;width:297px;height:10px!important;line-height:0;font-size:0;float:left;margin-bottom:0;padding:0;}\n.dropShadowUL158786994{background:url(https:\/\/forms.aweber.com\/images\/wfg\/drop-topLeft.png) no-repeat;width:10px;height:10px!important;float:left;margin-bottom:0;line-height:0;font-size:0;padding:0;}\n.dropShadowUR158786994{background:url(https:\/\/forms.aweber.com\/images\/wfg\/drop-topRight.png) no-repeat;width:10px;line-height:0;font-size:0;height:10px!important;float:left;margin-bottom:0;padding:0;}\n.lbl-right .af-element label{text-align:right;}\nbody {\n}","height":"382","width":"299","plPath":"forms.aweber.com","delay":"0","popupURL":"https:\/\/forms.aweber.com\/form\/94\/158786994.html","formType":"lightbox","animation":"default","redirectId":"redirect_46e82c4266f56c66a6bef9f9e39fa948","returnToPage":1} );
    };
    if (typeof awf_Form_.AWFormGenerator == 'undefined') {
        var unique_track = new Image();
        unique_track.src = "https://forms.aweber.com/form/displays.htm?id=jKwc7BxsnJws";
        if (typeof awf_Form_.FormQueue == 'undefined') { awf_Form_.FormQueue = []; }
        awf_Form_.FormQueue.push(loadForm);
    } else {
        var unique_track = new Image();
        unique_track.src = "https://forms.aweber.com/form/displays.htm?id=jKwc7BxsnJws";
        loadForm();
    }
    awf_Form_.setExpirationCookie();
}

awf_Form_.setExpirationCookie = function() {
    awf_Form_.expDate = new Date();
    awf_Form_.expDate.setTime(awf_Form_.expDate.getTime() + -86400000);
    awf_Form_.setCookie('awpopup_158786994', '1', awf_Form_.expDate, '/', document.domain, 0);
}
awf_Form_.setExpirationCookie()
if ((awf_Form_.isPreview || !awf_Form_.getCookie('awpopup_158786994')) && typeof hide_awf_Form=='undefined') {
    awf_Form_.showForm();
}