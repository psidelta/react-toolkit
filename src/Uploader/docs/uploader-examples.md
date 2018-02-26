##Minimal setup

Rendering the default file uploader will require a single props parameter, the targetUrl.

```jsx
<Uploader targetUrl='url-to-upload-api'/>
```

##Accesing file drop zone props

All file add/remove management happens in the file droppable subcomponent. This means that
removing items from the list needs to go thru that subcomponent. Instad of writing
a ton of dummy functions which just proxy the calls to the file dropzone, we expose a reference to that component via the `.fdz` key in the uploader.

So, if we get the uploader with a reference in our code, we can write things like this:

```jsx
<Uploader ref='myuploader' targetUrl='url-to-upload-api'/>

// ... in some handlers/lifecycle methods:

myuploader.fdz.getTotalFileSize()
```

Fdz has the full api of the file droppable. So all methods from the file-droppable.md work.

##Upload lifecycle calbacks 

If we want some kind of info about what's going on with the progress of the files being uploaded,
we can hook into the upload lifecycle with callbacks that allow reaction as well as prevention of 
action on each individual file, as well as on the entire uploader. 

```jsx
<Uploader 
	onAllQueuedFilesUploaded={()=>{console.log('all files uploaded')}}
	onUploadStart={()=>(confirm('are you sure?'))} //prompt user for starting file upload
	beforeFileAbort={()=>(false)} //prevent any file abort
	targetUrl='url-to-upload-api'
/>
```

##Passing down file drop zone props

All the file drop zone props are passed down to the subcomponents of the uploader. For exmple, if we want to only allow png files to be dropped in the file list, we can pass the accept flag.

```jsx
<Uploader 
	accept='image/png'
	fileMaxSize={1024*1024*5} //max 5 mb files accepted in drop zone
	targetUrl='url-to-upload-api'
/>
```