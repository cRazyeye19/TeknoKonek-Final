const postReducer =(
    state = {posts: [], loading: false, error: false, uploading: false, storyUploading: false, stories: [], retrievingStories: false},
    action
) => {
    switch(action.type){
        case "UPLOAD_START":
            return {...state, uploading: true, error: false}
        case "UPLOAD_SUCCESS":
            return {...state, posts: [action.data,...state.posts], uploading:false, error: false}
        case "UPLOAD_FAIL":
            return {...state, uploading: false, error: true}
        case "UPLOAD_STORY_START":
            return {...state, storyUploading: true, error: false}
        case "UPLOAD_STORY_SUCCESS":
            return {...state, storyUploading: false, error: false}
        case "UPLOAD_STORY_FAIL":
            return {...state, storyUploading: false, error: true}
        case "RETREIVING_STORIES_START":
            return {...state, retrievingStories: true, error: false}
        case "RETREIVING_STORIES_SUCCESS":
            return {...state, stories: action.data, retrievingStories: false, error: false}
        case "RETREIVING_STORIES_FAIL":
            return {...state, retrievingStories: false, error: true}
        default:
            return state
    }
}

export default postReducer