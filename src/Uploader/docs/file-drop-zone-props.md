###Props
----------------------------

Supports all `file-droppable` props, passing them along to the file-droppable internal
instance that it uses in order to handle file drag and drop.

Does not support these props if used in `noEvents={true}` mode, where it doens't instantiate
the file drop zone. The `noEvents` could be used for using the file drop zone as a inner componnet
in other `file-droppable` components.

###emptyClass, emptyStyle, emptyText

`string`, `object`, `bool|jsx`

These props controll the empty state of the drop zone. Adding a `emptyClass` will append that class to the file drop zone classNames. Adding the `emptyStyle` will set that style on the dropzone. Supplying a false `emptyText` will disable the rendering of any content in the empty zone.

###invalidClass, invalidStyle, invalidText

Similar with empty, but for invalid state, when files are invalid and still present in the
file list. This can happen is acceptInvalid is set to true, or if the file has been invalidated
by some other business logic (maybe a file upload failed).

###overClass, overStyle, overText

Same as empty or invalid, but for the state when files are being dragged over the drop zone.

###noEvents

`type` : `boolean`, `default` : `false`

If true, will disable the drag and drop event interaction.

###fileList

`type` : `React Class`, `default` : `react-filelist`

The file listing component responsbile for rendering what files have been dropped in the drop zone.
This is an optional parameter that can be set to render any type of view you want.

It will get the following props:
- files, the files to render
- onUploadClick, when a file wants to be uploaded
- onUploadCancelClick, when a file wants to cancel the upload progress (not supported in v1)
- onClearClick, when a file wants to be removed from the list
- uploadProgress, any details for the upload progress, if any. See uploader docs for the structure
of this prop object.

###uploadProgress

`type` : `Object`, `default`: `{}`

The files uploadProgress object, used to propagate details for file lists that support uploadProgress. This is a prop that is passed down from uploader thru the file dropzone and ends
up in the file list. See uploader docs for the structure of this prop object.

##theme

`type`: `String`, `default`: `default`

Applies an extra css class `react-file-dropzone-${theme}-theme` to the component, allowing it to be styled in different ways.

###Callback props and Methods
----------------------------

Supports all file droppable callbacks and methods. Only works when noEvents is false. If setting no events true, no interaction will work.


