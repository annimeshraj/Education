CKEDITOR.editorConfig = function (config) {
  // ... other configuration ...

  // config.toolbar_mini = [
  //   ["Bold",  "Italic",  "Underline",  "Strike",  "-",  "Subscript",  "Superscript"],
  // ];
  
  // config.extraPlugins = 'dragdrop';
  // // configure the backend service and credentials
  // config.dragdropConfig = {
  //     backend: 'imgur',
  //     settings: {
  //         clientId: 'YourImgurClientID'
  //     }
  // }
  // config.skin = 'v2';
  config.image_previewText = ' ';
  config.toolbar = 'simple';
  config.removeButtons = 'Anchor';
  config.removePlugins = 'elementspath,save,preview,newpage,templates,language,flash,bidi,iframe,forms,pagebreak,about';
  // config.filebrowserVideoBrowseUrl = "/file_up
}
//CKEDITOR.config.extraPlugins = 'youtube';


// CKEDITOR.on('dialogDefinition', function( ev )
// {
//    var dialogName = ev.data.name;  
//    var dialogDefinition = ev.data.definition;
         
//    switch (dialogName) {  
//    case 'image': //Image Properties dialog      
//    dialogDefinition.removeContents('Link');
//    dialogDefinition.removeContents('advanced');
//    break;      
//    case 'link': //image Properties dialog          
//    dialogDefinition.removeContents('advanced');   
//    break;
//    }
// });`

