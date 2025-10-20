if ( !window.jqWings )
	window.jqWings = {};

( function(){
	var _pop_msg_cfg = null;

	function callback( config, result ) {
			var usercall = config.callback;
			modality( false );
			config.box.parentNode.removeChild( config.box );
			_pop_msg_cfg = config.box = null;
			if ( usercall )
				usercall( result );
	};

	function modal_key( ev ) {
		if ( _pop_msg_cfg ){
			ev = ev||event;
			var code = ev.which||event.keyCode;
			if ( jqWings.message.keyboard ) {
				if ( code == 13 || code == 32 )
					callback( _pop_msg_cfg, true );
				if ( code == 27 )
					callback( _pop_msg_cfg, false );
			};
			if ( ev.preventDefault )
				ev.preventDefault();
			return !( ev.cancelBubble = true );
		};
	};

	if ( document.attachEvent )
		document.attachEvent( "onkeydown", modal_key );
	else
		document.addEventListener( "keydown", modal_key, true );

	function modality( mode ) {
		if(!modality.cover){
			modality.cover = document.createElement( "DIV" );
			//necessary for IE only
			modality.cover.onkeydown = modal_key;
			modality.cover.className = "jqw_modal_cover";
			document.body.appendChild( modality.cover );
		}
		var height =  document.body.scrollHeight;
		modality.cover.style.display = mode ? "inline-block" : "none";
	};

	function button ( text, result ) {
		return "<div class='jqWings_popup_button' result='" + result + "' ><div>" + text + "</div></div>";
	};

	function info( text ) {
		if (!popMsg.area){
			popMsg.area = document.createElement( "DIV" );
			popMsg.area.className = "jqWings_message_area";
			popMsg.area.style[ popMsg.position ]="5px";
			document.body.appendChild( popMsg.area );
		};

		popMsg.hide(text.id);
		var message = document.createElement( "DIV ");
		message.innerHTML = "<div>" + text.text + "</div>";
		message.className = "jqWings-info jqWings-" + text.type;
		message.onclick = function () {
			popMsg.hide( text.id );
			text = null;
		};

		if ( popMsg.position == "bottom" && popMsg.area.firstChild )
			popMsg.area.insertBefore( message, popMsg.area.firstChild );
		else
			popMsg.area.appendChild( message );

		if ( text.expire > 0 )
			popMsg.timers[ text.id ]=window.setTimeout( function() {
				popMsg.hide( text.id );
			}, text.expire );

		popMsg.pull[ text.id ] = message;
		message = null;

		return text.id;
	};

	function _boxStructure( config, ok, cancel ) {
		var box = document.createElement( "DIV" );
		box.className = " jqWings_modal_box jqWings-" + config.type;
		box.setAttribute( "jqwbox", 1 );

		var inner = '';

		if ( config.width  ) box.style.width = config.width;
		if ( config.height ) box.style.height = config.height;
		if ( config.title  ) inner += '<div class="jqWings_popup_title">' + config.title + '</div>';
		inner += '<div class="jqWings_popup_text"><span>' + ( config.content ? '' : config.text ) + '</span></div><div  class="jqWings_popup_controls">';

		if ( ok )     inner += button( config.ok     || "OK"    , true  );
		if ( cancel ) inner += button( config.cancel || "Cancel", false );
		if ( config.buttons ) {
			for ( var i=0; i<config.buttons.length; i++ )
				inner += button( config.buttons[ i ],i );
		};
		inner += '</div>';
		box.innerHTML = inner;

		if ( config.content ) {
			var node = config.content;
			if ( typeof node == "string" )      node = document.getElementById( node );
			if ( node.style.display == 'none' )	node.style.display = "";
			box.childNodes[ config.title? 1 : 0 ].appendChild( node );
		};

		box.onclick = function( ev ) {
			ev = ev ||event;
			var source = ev.target || ev.srcElement;
			if ( !source.className ) source = source.parentNode;
			if ( source.className == "jqWings_popup_button" ) {
				var result = source.getAttribute( "result" );
				result = ( result == "true" ) || ( result == "false" ? false : result );
				callback( config, result );
			};
		};
		config.box = box;
		if ( ok||cancel )
			_pop_msg_cfg = config;

		return box;
	};

	function _createBox( config, ok, cancel ) {
		var box = config.tagName ? config : _boxStructure( config, ok, cancel );

		if ( !config.hidden ) modality( true );
		document.body.appendChild( box );
		var x = config.left||Math.abs( Math.floor( ( ( window.innerWidth ||document.documentElement.offsetWidth ) - box.offsetWidth  ) / 2 ) );
		var y = config.top ||Math.abs( Math.floor( ( ( window.innerHeight||document.documentElement.offsetHeight) - box.offsetHeight ) / 2 ) );
		if ( config.position == "top" )	box.style.top = "-3px";
		else                            box.style.top = y+'px';
		box.style.left = x+'px';
		//necessary for IE only
		box.onkeydown = modal_key;

		box.focus();
		if ( config.hidden ) jqWings.modalbox.hide( box );

		return box;
	};

	function alertPopup( config ) {
		return _createBox( config, true, false );
	};

	function confirmPopup( config ) {
		return _createBox( config, true, true );
	};

	function boxPopup( config ) {
		return _createBox( config );
	};

	function box_params( text, type, callback ) {
		if ( typeof text != "object" ){
			if ( typeof type == "function" ) {
				callback = type;
				type = "";
			};
			text = { text : text, type : type, callback : callback };
		};
		return text;
	};

	function params( text, type, expire, id ) {
		if ( typeof text != "object"  )
			text = { text : text, type : type, expire : expire, id : id };
		text.id = text.id||popMsg.uid();
		text.expire = text.expire||popMsg.expire;
		return text;
	};

	jqWings.alert = function() {
		var text  = box_params.apply( this, arguments );
		text.type = text.type || "confirm";
		return alertPopup(text);
	};
	jqWings.confirm = function() {
		var text  = box_params.apply( this, arguments );
		text.type = text.type || "alert";
		return confirmPopup(text);
	};
	jqWings.modalbox = function() {
		var text  = box_params.apply( this, arguments );
		text.type = text.type || "alert";
		return boxPopup(text);
	};
	jqWings.modalbox.hide = function( node ) {
		while ( node && node.getAttribute && !node.getAttribute( "jqwbox" ) )
			node = node.parentNode;
		if ( node ) {
			node.parentNode.removeChild( node );
			modality( false );
		};
	};

	var popMsg = jqWings.message = function( text, type, expire, id ) {
		text = params.apply( this, arguments );
		text.type = text.type || "info";

		var subtype = text.type.split( "-" )[ 0 ];
		switch ( subtype ) {
			case "alert":
				return alertPopup( text );
			case "confirm":
				return confirmPopup( text );
			case "modalbox":
				return boxPopup( text );
			default:
				return info( text );
			break;
		};
	};

	popMsg.seed = ( new Date() ).valueOf();
	popMsg.uid  = function() { return popMsg.seed++; };
	popMsg.expire   = 4000;
	popMsg.keyboard = true;
	popMsg.position = "top";
	popMsg.pull     = {};
	popMsg.timers   = {};

	popMsg.hideAll = function() {
		for ( var key in popMsg.pull )
			popMsg.hide( key );
	};
	popMsg.hide = function( id ) {
		var obj = popMsg.pull[ id ];
		if ( obj && obj.parentNode ) {
			window.setTimeout( function() {
				obj.parentNode.removeChild( obj );
				obj = null;
			}, 2000 );
			obj.className += " hidden";

			if ( popMsg.timers[ id ] ) window.clearTimeout( popMsg.timers[ id ] );
			delete popMsg.pull[ id ];
		};
	};
})();