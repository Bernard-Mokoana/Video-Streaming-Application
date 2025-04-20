import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";

const commentAdapter = createEntityAdapter({
  selectId: (comment) => comment._id,
  sortComparator: (a, b) => b.createdAt.localeCompare(a.createdAt),
});

const initialState = commentAdapter.getInitialState({
  entities: {},
  ids: [],
  status: "idle",
  error: null,
  activeComments: null,
  expandedComments: {},
  sortOrder: "newest",
  pagination: {
    nextpageToken: null,
    hasMore: true,
  },
});

const commentSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {},
});
