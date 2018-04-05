###Props
----------------------------

##accept

`type`: `mixed`, `default`: function accepting all files, can be `function`, `string` or `array of strings`

Specifies which files will be accepted by the file drop zone.

- `PropTypes.func` - accept function will receive the file, and return `true` to accept it. accept as a function takes the following params
  - `file`: the blob file description for the given file that needs to be accepted or rejected
  - `index`: the position this file has in the array of files
  - `filesArray`: the files array
  - `props`: any other props currently present on the file droppable hoc component
- `PropTypes.string` - accept string will behave like the accept html prop on the input of type file
- `PropTypes.arrayOf(PropTypes.string)` - multiple stirngs will be concatenated into one and used in a similar way to the accept type of the html input of type file

###Examples

```jsx
FileDropppable(ReactComponentClass, {
  accept: 'images/png' // accept only png files
});
```


```jsx
FileDropppable(ReactComponentClass, {
  accept: (file, accept, index, files, props) => {
    //custom business logic here
    return decision; //decision based on business logic
  }
});
```


##acceptInvalid

`type`: `boolean`, `default`: `false`

Specify if invalid files (rejected based on `accept`, `isFileValid` or size or count contraints) should still be rendered in the UI instead of ignored completely.

Invalid files will contain a `invaldiDetails` object on them, allowing file lists to implement rendering logic for this case. The invalidDetails must
contain a `message` key with a string explaining the reasson why the file
has been marked as invalid.


##acceptDuplicates

`type`: `boolean`, `default`: `false`

Specify if the same file can be dropped more than once. Is not handled in the uploader because the progress tracking is done per file id basis, and the way the ui figures out
duplicate ids is if they have the same file id. In other words, you won't be able to upload
the same file multiple times from the same uploader. 


##appendOnDrop

`type: `boolean`, `default`: `true`

Specify if new dropped files should replace the exisitng ones or not. `appendOnDrop={false}`  is not supported in file uploader componet at this moment when files are in upload progress. Dropping new files will not cancel uploading the old ones, it will just replace them but not cancel the upload progress for them.

##disabled

`type: `boolean`, `default`: `false`

If `true`, will ignore any events, esentially not allowing any drag and drop interaction.


##multiple

`type`: `boolean`, `default`: `true`

When `false`, shorthand method for `fileMaxCount = 1`. No behavior for `multiple={true}`. It's just a shortcut for setting the max count to 1.


##defaultFiles

`type`: `Array`

Instance only prop. Will initialise the file droppable component with the given props.

###Example:

```jsx
const WrappedFileDroppable = FileDropppable(ReactComponentClass);

return <WrappedFileDroppable defaultFiles={arrayOfFiles}/>

```

##files

`type`: `Array`

Controll property. Will dictate what gets showed in the file dropzone. Use this in
combination with `onChange` to controll the behavior of the component.

###Example:

```jsx
const WrappedFileDroppable = FileDropppable(ReactComponentClass);

return <WrappedFileDroppable files={arrayOfFiles}
          onChange={(files)=>{
            // do stuff with new files and set the file prop agian
          }}
        />

```

##fileMaxSize, fileMinSize, fileMaxCount

`type`:`number`

Size and count constraints. Will validate files based on their min and max size, as well as count how many files are dropped or already dropped in the drop zone.

###Example

```jsx
const WrappedFileDroppable = FileDropppable(ReactComponentClass, {
  fileMaxSize: 1024*1024,
  fileMinSize: 1024*1024,
  fileMaxCount: 5
});

//can overwrite class props with instance props
return <WrappedFileDroppable fileMaxCount={3}/>

```

##isFileValid

`type`:`function`

Optional validation function, has the last say in accepting or rejecting a file. Gets
called with:

- `file` the file blob to be validated by the current invocation of the function
- `valid` boolean, if the file passed the internal validation of the droppable component
- `files` array of files, the files currently in the drop zone
- `index` nunber, position of the current file in the array

Returning `true` will validate the file no matter the validation logic of the component.

Returning `object` containing `message` of type `String` or simply a `string` will reject the file and add the reasson to the array of invalidDetails for the given file. 

###Callback props
----------------------------

##onDragEnter

`type`: `function`

Callback for drag enter event. Does not receive any dragged files as access to those is restrecited for security reassons by the browser.

##onDragLeave

`type`: `function`

Callback for drag leave event. Triggered only when leaving the parent, not each individual child. Behaves like a proper drag leave event, not like the html drag leave event where each child of the
parent triggeres drag leaves.

##onChange

`type`: `function`

Callback for file change events. Triggered every time a file is added or removed. This is the main **controlled component hook** for parents to listen to and update the list of files in a controlled way.

##onRemoveAt

`type`: `function`

Called when a file will be removed at a given position. Returning anything falsy will prevent the remove.

Receives the following params: `{file, idx}`
  - `file` is the file blob object
  - `idx` is the posiiton of the file in the list of files


###Methods
----------------------------


##getFiles()

Returns the current files present in the dropzone.

##getFileNames()

Returns the name of the current files. Same as `getFiles().map({name}=>(name))`.

##getTotalFileSize()

Returns the total size of all the files in the drop zone.

##revalidateFiles()

Runs the validation function once more on the given files. Usefull for edge caeses or custom
flows where the react lifecycle methods are not enough.

##clearFiles

Empties the file list or calls onChange with empty array.

##removeFileAt(index)

Removes a file at given index. Can be prevented by not returning true in `onRemoveAt`

##removeFile(fileID)

Removes a file identified by `fileID`. Can be prevented by not returning true in `onRemoveAt`


