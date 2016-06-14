CKEDITOR.dialog.add( 'video', function ( editor )
{
	var lang = editor.lang.video;

	function commitValue( videoNode, extraStyles )
	{
		var value=this.getValue();

		if ( !value && this.id=='id' )
			value = generateId();

		videoNode.setAttribute( this.id, value);

		if ( !value )
			return;
		switch( this.id )
		{
			case 'poster':
				extraStyles.backgroundImage = 'url(' + value + ')';
				break;
			case 'width':
				extraStyles.width = value + 'px';
				break;
			case 'height':
				extraStyles.height = value + 'px';
				break;
		}
	}

	function commitSrc( videoNode, extraStyles, videos )
	{
		var match = this.id.match(/(\w+)(\d)/),
			id = match[1],
			number = parseInt(match[2], 10);

		var video = videos[number] || (videos[number]={});
		video[id] = this.getValue();
	}

	function loadValue( videoNode )
	{
		if ( videoNode )
			this.setValue( videoNode.getAttribute( this.id ) );
		else
		{
			if ( this.id == 'id')
				this.setValue( generateId() );
		}
	}

	function loadSrc( videoNode, videos )
	{
		var match = this.id.match(/(\w+)(\d)/),
			id = match[1],
			number = parseInt(match[2], 10);

		var video = videos[number];
		if (!video)
			return;
		this.setValue( video[ id ] );
	}

	function generateId()
	{
		var now = new Date();
		return 'video' + now.getFullYear() + now.getMonth() + now.getDate() + now.getHours() + now.getMinutes() + now.getSeconds();
	}

	// To automatically get the dimensions of the poster image
	var onImgLoadEvent = function()
	{
		// Image is ready.
		var preview = this.previewImage;
		preview.removeListener( 'load', onImgLoadEvent );
		preview.removeListener( 'error', onImgLoadErrorEvent );
		preview.removeListener( 'abort', onImgLoadErrorEvent );

		this.setValueOf( 'info', 'width', preview.$.width );
		this.setValueOf( 'info', 'height', preview.$.height );
	};

	var onImgLoadErrorEvent = function()
	{
		// Error. Image is not loaded.
		var preview = this.previewImage;
		preview.removeListener( 'load', onImgLoadEvent );
		preview.removeListener( 'error', onImgLoadErrorEvent );
		preview.removeListener( 'abort', onImgLoadErrorEvent );
	};

	var ShowProgressIndicator = function()
	{
		jQuery(".video-progess-indicator").fadeIn(500);
	}

	return {
		title : lang.dialogTitle,
		minWidth : 400,
		minHeight : 200,

		onShow : function()
		{
			// Clear previously saved elements.
			this.fakeImage = this.videoNode = null;
			// To get dimensions of poster image
			this.previewImage = editor.document.createElement( 'img' );

			var fakeImage = this.getSelectedElement();
			if ( fakeImage && fakeImage.data( 'cke-real-element-type' ) && fakeImage.data( 'cke-real-element-type' ) == 'video' )
			{
				this.fakeImage = fakeImage;

				var videoNode = editor.restoreRealElement( fakeImage ),
					videos = [],
					sourceList = videoNode.getElementsByTag( 'source', '' );
				if (sourceList.count()==0)
					sourceList = videoNode.getElementsByTag( 'source', 'cke' );

				for ( var i = 0, length = sourceList.count() ; i < length ; i++ )
				{
					var item = sourceList.getItem( i );
					videos.push( {src : item.getAttribute( 'src' ), type: item.getAttribute( 'type' )} );
				}

				this.videoNode = videoNode;

				this.setupContent( videoNode, videos );
			}
			else
				this.setupContent( null, [] );
		},

		onOk : function()
		{
			var video = new CKEDITOR.dom.element( 'VIDEO', editor.document );
			editor.insertElement( video );
			var source = new CKEDITOR.dom.element( 'SOURCE', editor.document );
			source.setAttribute('src', this.videoNode);
			video.append(source);
			video.setAttribute('controls', true);
			video.setAttribute('width', 400);
			// debugger;
			// video.setAttribute('src', this.videoNode);

			// // If there's no selected element create one. Otherwise, reuse it
			// var videoNode = null;
			// if ( !this.fakeImage )
			// {
			// 	videoNode = CKEDITOR.dom.element.createFromHtml( '<cke:video></cke:video>', editor.document );
			// 	videoNode.setAttributes(
			// 		{
			// 			controls : 'controls'
			// 		} );
			// }
			// else
			// {
			// 	videoNode = this.videoNode;
			// }

			// var extraStyles = {}, videos = [];
			// this.commitContent( videoNode, extraStyles, videos );

			// var innerHtml = '', links = '',
			// 	link = lang.linkTemplate || '',
			// 	fallbackTemplate = lang.fallbackTemplate || '';
			// for(var i=0; i<videos.length; i++)
			// {
			// 	var video = videos[i];
			// 	if ( !video || !video.src )
			// 		continue;
			// 	innerHtml += '<cke:source src="' + video.src + '" type="' + video.type + '" />';
			// 	links += link.replace('%src%', video.src).replace('%type%', video.type);
			// }
			// videoNode.setHtml( innerHtml + fallbackTemplate.replace( '%links%', links ) );

			// // Refresh the fake image.
			// var newFakeImage = editor.createFakeElement( videoNode, 'cke_video', 'video', false );
			// newFakeImage.setStyles( extraStyles );
			// if ( this.fakeImage )
			// {
			// 	newFakeImage.replace( this.fakeImage );
			// 	editor.getSelection().selectElement( newFakeImage );
			// }
			// else
			// {
			// 	// Insert it in a div
			// 	var div = new CKEDITOR.dom.element( 'VIDEO', editor.document );
			// 	editor.insertElement( div );
			// 	div.append( newFakeImage );
			// }
		},
		onHide : function()
		{
			if ( this.previewImage )
			{
				this.previewImage.removeListener( 'load', onImgLoadEvent );
				this.previewImage.removeListener( 'error', onImgLoadErrorEvent );
				this.previewImage.removeListener( 'abort', onImgLoadErrorEvent );
				this.previewImage.remove();
				this.previewImage = null;		// Dialog is closed.
			}
		},

		contents :
		[
			{
				id : 'info',
				elements :
				[
					{
						type : 'hbox',
						widths: [ '', '100px'],
						children : [
							{
								type : 'text',
								id : 'poster',
								label : '<span style="font-weight:bold;">URL</span>',
								commit : commitValue,
								setup : loadValue,
								className: 'video-url-holder'
								// onChange : function()
								// {
								// 	var dialog = this.getDialog(),
								// 		newUrl = this.getValue();

								// 	//Update preview image
								// 	if ( newUrl.length > 0 )	//Prevent from load before onShow
								// 	{
								// 		dialog = this.getDialog();
								// 		var preview = dialog.previewImage;

								// 		preview.on( 'load', onImgLoadEvent, dialog );
								// 		preview.on( 'error', onImgLoadErrorEvent, dialog );
								// 		preview.on( 'abort', onImgLoadErrorEvent, dialog );
								// 		preview.setAttribute( 'src', newUrl );
								// 	}
								// }
							}
							// ,
							// {
							// 	type : 'button',
							// 	id : 'browse',
							// 	hidden : 'true',
							// 	style : 'display:inline-block;margin-top:10px;',
							// 	filebrowser :
							// 	{
							// 		action : 'Browse',
							// 		target: 'info:poster',
							// 		url: editor.config.filebrowserImageBrowseUrl || editor.config.filebrowserBrowseUrl
							// 	},
							// 	label : editor.lang.common.browseServer
							// }
							]
					},
					{
						type : 'hbox',
						widths: [ '50%', '50%'],
						children : [
							{
								type : 'file',
								getAction : "/file_upload",
								onChange : function(evt) {
									// alert(1);
									console.log("file changed");
									// debugger;
									console.log(this);
									console.log(evt);
									var iframe = jQuery(this.getElement().$).find('iframe');
									jQuery(iframe.contents()[0]).find('form').attr('action', '/video_upload')
									// this.setValue = "/file_upload";
									// this.getAction = "/file_upload";
									this.submit();
									// Show the progress indicator
									ShowProgressIndicator();
								},
								submit : function(res) {
									console.log("form submitted");
								}
								// fileButton : "Submit"
							}
							// {
							// 	type : 'fileButton',
							// 	change : function(evt){
							// 		CKEDITOR.dom.element();
							// 	}
							// }
						]
					// {
					// 	type : "file",
					// 	enable : true
					// 	// label : "Upload Video"
					// },
					},
					{
	                    type: 'html',
	                    html: '<div class="video-progess-indicator" style="background-color: rgba(0,0,0,0.1); display:none; height:100%; left:0; position: absolute; text-align: center; top:0; width:100%; z-index:9999;"> \
	                    		<img src="data:image/gif;base64,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" \
	                    		alt="Uploading..." style="padding-top: 8em;"></img> \
	                    	</div>'
					},
					// {
					// 	type : 'hbox',
					// 	widths: [ '100%'],
					// 	children : [
					// 		{
					// 			type : 'fileButton',
					// 			// label : "Send it to setuperver"
					// 		}
					// 	]
					// // {
					// // 	type : "file",
					// // 	enable : true
					// // 	// label : "Upload Video"
					// // },
					// },
					// {
					// 	type : 'hbox',
					// 	widths: [ '33%', '33%', '33%'],
					// 	children : [
					// 		{
					// 			type : 'text',
					// 			id : 'width',
					// 			label : editor.lang.common.width,
					// 			'default' : 400,
					// 			validate : CKEDITOR.dialog.validate.notEmpty( lang.widthRequired ),
					// 			commit : commitValue,
					// 			setup : loadValue
					// 		},
					// 		{
					// 			type : 'text',
					// 			id : 'height',
					// 			label : editor.lang.common.height,
					// 			'default' : 300,
					// 			validate : CKEDITOR.dialog.validate.notEmpty(lang.heightRequired ),
					// 			commit : commitValue,
					// 			setup : loadValue
					// 		},
					// 		{
					// 			type : 'text',
					// 			id : 'id',
					// 			label : 'Id',
					// 			commit : commitValue,
					// 			setup : loadValue
					// 		}
					// 			]
					// },
					// {
					// 	type : 'hbox',
					// 	widths: [ '', '100px', '75px'],
					// 	children : [
					// 		{
					// 			type : 'text',
					// 			id : 'src0',
					// 			label : lang.sourceVideo,
					// 			commit : commitSrc,
					// 			setup : loadSrc
					// 		},
					// 		{
					// 			type : 'button',
					// 			id : 'browse',
					// 			hidden : 'true',
					// 			style : 'display:inline-block;margin-top:10px;',
					// 			filebrowser :
					// 			{
					// 				action : 'Browse',
					// 				target: 'info:src0',
					// 				url: editor.config.filebrowserVideoBrowseUrl || editor.config.filebrowserBrowseUrl
					// 			},
					// 			label : editor.lang.common.browseServer
					// 		},
					// 		{
					// 			id : 'type0',
					// 			label : lang.sourceType,
					// 			type : 'select',
					// 			'default' : 'video/mp4',
					// 			items :
					// 			[
					// 				[ 'MP4', 'video/mp4' ],
					// 				[ 'WebM', 'video/webm' ]
					// 			],
					// 			commit : commitSrc,
					// 			setup : loadSrc
					// 		}]
					// },

					// {
					// 	type : 'hbox',
					// 	widths: [ '', '100px', '75px'],
					// 	children : [
					// 		{
					// 			type : 'text',
					// 			id : 'src1',
					// 			label : lang.sourceVideo,
					// 			commit : commitSrc,
					// 			setup : loadSrc
					// 		},
					// 		{
					// 			type : 'button',
					// 			id : 'browse',
					// 			hidden : 'true',
					// 			style : 'display:inline-block;margin-top:10px;',
					// 			filebrowser :
					// 			{
					// 				action : 'Browse',
					// 				target: 'info:src1',
					// 				url: editor.config.filebrowserVideoBrowseUrl || editor.config.filebrowserBrowseUrl
					// 			},
					// 			label : editor.lang.common.browseServer
					// 		},
					// 		{
					// 			id : 'type1',
					// 			label : lang.sourceType,
					// 			type : 'select',
					// 			'default':'video/webm',
					// 			items :
					// 			[
					// 				[ 'MP4', 'video/mp4' ],
					// 				[ 'WebM', 'video/webm' ]
					// 			],
					// 			commit : commitSrc,
					// 			setup : loadSrc
					// 		}]
					// }
				]
			}

		]
	};
} );