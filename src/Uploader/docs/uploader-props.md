###Props
----------------------------

Passes along all relevant props to file drop zone, which in turn passes along all relevant props
to file droppable. 

Apart from the props supported by file dropzone and file droppable, uploader supports the following props:

##targetUrl

`type` : `string`, **required**

Required destination url for the uploaded files. This property MUST be provided. 

```jsx
<Uploader targetUrl='url-to-uploader-api'/>
```

##xhr

`type`: `function`, `default`: `xhr` package from npm.

The xhr utility function that will handle all the ajax requests. This is used by the uploader
function to make the calls and should implement the API provided by the [the xhr npm package](https://www.npmjs.com/package/xhr). 

##requestHeaders

`type`: `object`, `default`: `{}`

Any extra reuqest headers to pass along to the requests. Usefull for passing custom header fields.

##locale

`type`: `string`, `default`: `null`

The current locale for the application. Will be used to format numbers. If none is supplied, the browser default will be used.

##fileSizeFormatter

`type`: `function`, `default`: `inernal implementation`

Function to parse file sizes and return pretty values. This function gets the followin params:
- `size`: number, the size to format
- `config`: 
	- `gbSingular`: default 'GB';
	- `gbPlural`: default 'GBs';
	- `mbSingular`: default 'MB';
	- `mbPlural`: default 'MBs';
	- `kbSingular`: default 'KB';
	- `kbPlural`: default 'KBs';
	- `byteSingular`: default "B";
	- `bytePlural`: default 'Bs';
	- `locale`: default ' ';
	- `formatNumber`: `function`, another optional function to overwrite the way numbers ar formated. `formatNumber` receives the a number and a locale and must return a string.

##timeFormatter

`type`: `function`, `default`: `inernal implementation`

Function used to parse time values and present pretty values. This function is used for ETAs,
not for displaying date/time like '2 days ago' etc. Gets called with:
- `time`: number, the time to fromat
- `config`:
	- `millisecondText`: default 'ms',
	- `secondText`: default 's',
	- `minuteText`: default 'm',
	- `hourText`: default 'h',
	- `dayText`: default 'd',
	- `showMilliseconds`: default `false`,
	- `showSeconds`: default `true`,
	- `showMinutes`: default `true`,
	- `collapseHalfUnits`: default `true`,
	- `formatNumber`: default `true`,
	- `locale`: default ' ',
	- `formatNumber`: `function`, another optional function to overwrite the way numbers ar formated. `formatNumber` receives the a number and a locale and must return a string.

  
  
##defaultFiles

`type`: `Array`

Instance only prop. Will initialise the uploader component with the given files.

###Example:

```jsx

return <Uploader targetUrl={...} defaultFiles={arrayOfFiles}/>

```

##files

`type`: `Array`

Controll property. Will dictate what gets showed in the uploader file list. Use this in
combination with `onChange` to controll the behavior of the component.

###Example:

```jsx

return <Uploader targetUrl={...} files={arrayOfFiles}/>

```  
  
  
##uploaderMenuPosition

`type`: `string`, default `bottom`

Specify where to render the uploader menu. Can be `top` or `bottom`. Positioning is done by changing the order of items in the layout, not by css, but there's also a css class modifier 
applied indicating which menu position was used.
  
##renderUploaderMenu

`type`: `function`, default `internal implementation`

If `null`, will not render any menu. Useful for uploaders that need to upload file instantly. 

If `function`, will be exepected to return a JSX representation of the footer menu. Gets called with the following parameters:

- `filesInUploadOrQueue`: how many files are in upload or queued to be uploaded
- `files`: the array of blob file objects
- `uploadProgress`: the map of upload progresses holding details about each file's progress or status
- `onSelectFiles`: function to be used to pass along selected files. Use this with your own file input implementation to capture picked files from the browser file picker dialog.
- `clearFiles`: function to be called to trigger the clear files flow
- `uploadFiles`: function to be called to trigger the upload files flow
- `renderUploadAllButton`: function to be called to render the content of the upload button. This is either a custom implementation supplied via props, or the internal implementation which will render the default file upload button.
- `renderGlobalProgressBar`: function to be called to render the content of the progress bar.
- `shouldShowGlobalProgressBar`: function which will indicate if the progress bar needs to be showed.
- `renderFilePickButton`: function to be called to render the file pick button.
- `renderFileClearButton`: function to be called to render the file clear button.
- `locale`: the locale to be used to format the numbers in this uploader. Gets passed down to utility functions
- `i18n`: a simple object containing SELECT_FILES, CLEAR_FILES, UPLOAD_FILES, REMAINING_LABEL keys
to be used as the labels of the buttons. 
  
##renderFilePickButton

`type`: `function`, default `internal implementation`

Function to be called to render the file pick button. Gets called with `{disabled, onSelectFiles, buttonLabel}`

##renderFileClearButton

`type`: `function`, default `internal implementation`

Function to be called to render the file clear button. Gets called with `{disabled, onClearFiles, buttonLabel}`

##renderUploadAllButton

`type`: `function`, default `internal implementation`

Function to be called to render the files upload button. Gets called with `{files, uploadProgress, uploadFiles, buttonLabel}`

##autoUploadFiles

`type`: `boolean`, default `false`

If `true` will start upload of dropped valid files instantly.

##disableFileDrop

`type`: `boolean`, default `false`

If `true` will disable the drop zone interactions.

##i18n

`type`: `object`, default `internal values`

A simple object with the following keys: SELECT_FILES, CLEAR_FILES, UPLOAD_FILES, REMAINING_LABEL. 

Will be used to render text that could be internationalized if needed.

##singleFile

`type`: `boolean`, default `false`

Shortcut prop for `simultaneousFileUpload=1`

##simultaneousFileUpload

`type`: `number`, default `3`

How many files to upload at the same time.

##chunked

`type`: `boolean`, default `false`

If `true` will enable chunked file uploading, whcih requires different server implementation. Will split each file based on the chunk props (`chunkSize` and `simultaneousChunksPerFile`) and
send chunks to the server instead of the whole file.

##simultaneousChunksPerFile

`type`: `number`, default `3`

How many chunks to send for each file at a given time. This only works when `chunked=true`.

##chunkSize

`type`: `number`, default `1024*1024`

The max size of chunks to send to the server. Will be used to split files into chunks. last chunk might be smaller in size than this value. Only works when `chunked=true`.


###Callback props
----------------------------

##onChange

`type`: `function`

Callback for file change events. Triggered every time a file is added or removed. This is the main **controlled component hook** for parents to listen to and update the list of files in a controlled way.


##uploadProgress

Most callbacks receive an object named `uploadProps`. This is a frequently 
used object containing details related to the state of a file in regards
to the upload process:

`uploadProgress` can contain the following keys:
 - `startTime`, a date time value of when the upload has been started for this object.
 - `inProgress`, `true` if file is currently in upload progress, falsy if not.
 - `queued`, `true` if file will be inProgress when certain conditions like `simultaneousFileUpload` ar satisifed and upload can begin for this file as well.
 - `error`, `object` when a upload error has occured.
 - `done`, `true` if file upload was successful, falsy otherwise.
 - `uploadedSize`, `number` of bytes uploaded, or falsy value when upload did not start.
 - `totalSize`, `number` of total bytes to be uploaded, or falsy when upload did no start.
 - `uploadTime`, `number`, the difference between start time and when the upload finished
 - `chunkWrapper`, `array` of objects containing information about the chunks when
 a file is in chunked upload mode. The chunkWrapper is an object containing the following props:
 	- `chunkId`, the id of the chunk, generated based on the `fileid`.
 	- `chunkOffsets`, the start and end offset of the file slice representing this chunk.
 	- `idx`, the index of the chunk in the chunk array.
 	- `status` of type `string` of values: `queued`, `uploading`, `aborted`, `error`, `done`, indicating in what state the chunk is in relation to the upload progress.  

Supports all file droppable callbacks and methods. Only works when noEvents is false. If setting no events true, no interaction will work.

##onUploadStart(files)

Called when a new upload sequence is about to start. Returning true will alow the upload to begin. Returning any falsy value will prevent the upload from initiating.

##beforeFileUpload({file, fileIndex, uploaderProgress})

Called when a file will begin uploading. If returning anything else but `true`, it will prevent that file from being uploaded.

##onFlieUploadStart({file, uploaderProgress})

Called when a file started uploading. It's no longer cancelable. Useful for custom business logic.

##onFileUploadProgress({file, xhrParams, uploaderProgress})

Called each time a relevant progress for the upload of a given file occurs. This method is throttled, so it won't trigger too many times each second.

##beforeFileAbort({file, fileIndex, uploadProgress})

Called each time a file wants to abort because of user interaction. Returning anything but `true` will prevent the abort from happening. 

##onFileUploadAbort({file, xhrParams, uploaderProgress}) onFileUploadDone({file, xhrParams, uploaderProgress})

Called when a file has been aborted/done/finished with error.

###onFileUploadError({file, xhrParams, uploaderProgress})

Called when a file upload resulted in a xhr error generated by the xhr request object of the browser.

##onAllQueuedFilesUploaded()

Called when all files in a given queue have finished uploading. This happens when the file queue is empty, so uploading each file individually will trigger this when that given file is done and there are no more file in the queue.

##beforeClearAllFiles({ filesInUploadOrQueue, files, uploadProgress})

Called as a hook for clear files. Returning anything but `true` will prevent the clear flow.

###Methods
----------------------------

Supports all file droppable callbacks and methods. Only works when noEvents is false. If setting no events true, no interaction will work.

Calling the methods can be done by referencing the `.fdz` key on the uploader component:



```jsx
<Uploader ref='myuploader' targetUrl='url-to-uploader-api'/>

myuploader.fdz.removeFileAt(1);

```

