import {
    createSlice,
    createAsyncThunk,
} from "@reduxjs/toolkit";
import { collabRequest, myCollabRequest, userNetwork, suggestedNetwork } from "../../Services/networkService";

export const fetchCollaborationRequests = createAsyncThunk(
    'network/fetchCollaborationRequests',
    async (_, { rejectWithValue }) => {
        try {
            const response = await collabRequest();
            if (response.status == "success") {
                return response.data;
            } else {
                return rejectWithValue(response.message);
            }
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }, {
    condition: (_, { getState }) => {
        const state = getState();
        const data = state?.network?.collaborationRequests?.data;

        return data === null;
    },
}
);

export const fetchMyRequests = createAsyncThunk(
    'network/fetchMyRequests',
    async (_, { rejectWithValue }) => {
        try {
            const response = await myCollabRequest();
            if (response.status == "success") {
                return response.data;
            } else {
                return rejectWithValue(response.message);
            }
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }, {
    condition: (_, { getState }) => {
        const state = getState();
        const data = state?.network?.myCollabRequest?.data;

        return data === null;
    },
}
);

export const fetchMyNetwork = createAsyncThunk(
    'network/fetchMyNetwork',
    async (_, { rejectWithValue }) => {
        try {
            const response = await userNetwork();
            if (response.status == "success") {
                return response.data;
            } else {
                return rejectWithValue(response.message);
            }
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }, {
    condition: (_, { getState }) => {
        const state = getState();
        const data = state?.network?.myNetwork?.data;

        return data === null;
    },
}
);

export const fetchSuggestedNetwork = createAsyncThunk(
    'network/fetchSuggestedNetwork',
    async (_, { rejectWithValue }) => {
        try {
            const response = await suggestedNetwork();
            if (response.status == "success") {
                return response.data;
            } else {
                return rejectWithValue(response.message);
            }
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }, {
    condition: (_, { getState }) => {
        const state = getState();
        const data = state?.network?.suggestedNetwork?.data;

        return data === null;
    },
}
);

const initialState = {
    collaborationRequests: {
        data: null,
        loading: false
    },
    myCollabRequest: {
        data: null,
        loading: false
    },
    myNetwork: {
        data: null,
        loading: false
    },
    suggestedNetwork: {
        data: null,
        loading: false
    }
};

const networkSlice = createSlice({
    name: "network",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // Fullfilled Actions of Thunks
        builder
            .addCase(fetchCollaborationRequests.pending, (state, action) => {
                state.collaborationRequests.loading = false;
            })
            .addCase(fetchCollaborationRequests.fulfilled, (state, action) => {
                state.collaborationRequests.loading = true;
                state.collaborationRequests.data = action.payload;
            })
            .addCase(fetchMyRequests.pending, (state, action) => {
                state.myCollabRequest.loading = false;
            })
            .addCase(fetchMyRequests.fulfilled, (state, action) => {
                state.myCollabRequest.loading = true;
                state.myCollabRequest.data = action.payload;
            })
            .addCase(fetchMyNetwork.pending, (state, action) => {
                state.myNetwork.loading = false;
            })
            .addCase(fetchMyNetwork.fulfilled, (state, action) => {
                state.myNetwork.loading = true;
                state.myNetwork.data = action.payload;
            })
            .addCase(fetchSuggestedNetwork.pending, (state, action) => {
                state.suggestedNetwork.loading = false;
            })
            .addCase(fetchSuggestedNetwork.fulfilled, (state, action) => {
                state.suggestedNetwork.loading = true;
                state.suggestedNetwork.data = action.payload;
            })
    },
});

export default networkSlice.reducer;
