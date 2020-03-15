const INITIAL_STATE = {
  error: null,
  isEdit: false,
  isLoading: false,
  isCreating: false,
  isUpdating: false,
  isDeleting: false,
  video: null,
  form: {
    business_name: "",
    business_website: "",
    description: "",
    extra_field_1: "",
    extra_field_2: "",
    extra_field_3: "",
    extra_field_4: "",
    extra_field_5: "",
    featured: false,
    published_at: null,
    slug: "",
    subtitle: "",
    thumbnail_url: "",
    title: "",
    video_url: "",
  }
};

const videoDetailReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "VIDEO_LOADING":
      return {
        ...state,
        isLoading: true,
        video: null
      };

    case "VIDEO_CREATING":
      return {
        ...state,
        isCreating: true,
        error: null
      };

    case "VIDEO_UPDATING":
      return {
        ...state,
        isUpdating: true,
        error: null
      };

    case "VIDEO_DELETING":
      return {
        ...state,
        isDeleting: true,
        error: null
      };

    case "VIDEO_LOADED":
      return {
        ...state,
        isLoading: false,
        video: action.video
      };

    case "VIDEO_CREATED":
      return {
        ...state,
        isCreating: false,
        video: action.video
      };

    case "VIDEO_UPDATED":
      return {
        ...state,
        isUpdating: false,
        video: action.video
      };

    case "VIDEO_ERROR":
      return {
        ...state,
        error: action.error,
        isCreating: false,
        isLoading: false,
        isUpdating: false,
        isDeleting: false
      };

    case "EDIT_ON":
      return {
        ...state,
        isEdit: true
      };

    case "EDIT_OFF":
      return {
        ...state,
        isEdit: false
      };

    case "EDIT_DETAIL":
      return {
        ...state,
        form: {
          ...state.form,
          [action.name]: action.value
        }
      };

    case "EDIT_DATE":
      return {
        ...state,
        form: {
          ...state.form,
          published_at: action.date
        }
      };

    case "RESET_FORM":
      return {
        ...state,
        error: null,
        form: action.data
      }

    case "VIDEO_DELETED":
    case "RESET_VIDEO":
      return INITIAL_STATE;

    default:
      return state;
  }
};

export default videoDetailReducer;
