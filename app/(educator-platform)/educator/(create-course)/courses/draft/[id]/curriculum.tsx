export const Curriculum = () => {
  return (
    <div className="text-sm">
      <h1 className="text-lg font-semibold text-primary">Curriculum</h1>

      <p className="mt-4 text-body">
        Start putting together your course by creating sections, lectures and
        practice activities (<span className="underline">quizzes</span>,{" "}
        <span className="underline">coding exercises</span> and{" "}
        <span className="underline">assignments</span>). Use your{" "}
        <span className="underline">course outline</span> to structure your
        content and label your sections and lectures clearly. If you&#39;re
        intending to offer your course for free, the total length of video
        content must be less than 2 hours.
      </p>

      <div className="mt-8 rounded-lg border border-border bg-container p-6 text-heading">
        <h2>
          <span className="font-bold text-heading">Section 1: </span>{" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="14"
            fill="none"
            viewBox="0 0 12 14"
            className="mx-2 mb-1 inline"
          >
            <path
              fill="#111827"
              d="M7.333.323H1.999c-.733 0-1.326.6-1.326 1.334L.666 12.323c0 .734.593 1.334 1.327 1.334h8.006c.734 0 1.334-.6 1.334-1.334v-8l-4-4Zm-5.334 12V1.657h4.667V4.99h3.333v7.333H2Z"
            />
          </svg>
          Introduction
        </h2>

        <div className="mt-4 flex items-center justify-between rounded-lg border border-border bg-sidebar p-4">
          <h3 className="">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              fill="none"
              viewBox="0 0 14 14"
              className="mb-1 mr-2 inline"
            >
              <path
                fill="#111827"
                d="M7 .323A6.67 6.67 0 0 0 .335 6.99a6.67 6.67 0 0 0 6.667 6.667 6.67 6.67 0 0 0 6.666-6.667A6.67 6.67 0 0 0 7.001.323Zm-1.333 10L2.782 7.438l.94-.94 1.945 1.939L9.89 4.215l.94.946-5.162 5.162Z"
              />
            </svg>
            Lesson 1:
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="14"
              fill="none"
              viewBox="0 0 12 14"
              className="mb-1 ml-3 mr-2 inline"
            >
              <path
                fill="#111827"
                d="M7.333.323H1.999c-.733 0-1.326.6-1.326 1.334L.666 12.323c0 .734.593 1.334 1.327 1.334h8.006c.734 0 1.334-.6 1.334-1.334v-8l-4-4Zm-5.334 12V1.657h4.667V4.99h3.333v7.333H2Z"
              />
            </svg>
            The Basic
          </h3>
          <button className="flex w-fit items-center gap-2 rounded-lg border border-border px-4 py-2 text-primary hover:bg-secondary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="15"
              fill="none"
              viewBox="0 0 14 15"
            >
              <path
                fill="currentColor"
                d="M14 8.7H8v6H6v-6H0v-2h6v-6h2v6h6v2Z"
              />
            </svg>
            <span className="font-bold">Content</span>
          </button>
        </div>

        <div className="mt-4 flex items-center justify-between rounded-lg border border-border bg-sidebar p-4">
          <h3 className="">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              fill="none"
              viewBox="0 0 14 14"
              className="mb-1 mr-2 inline"
            >
              <path
                fill="#111827"
                d="M7 .323A6.67 6.67 0 0 0 .335 6.99a6.67 6.67 0 0 0 6.667 6.667 6.67 6.67 0 0 0 6.666-6.667A6.67 6.67 0 0 0 7.001.323Zm-1.333 10L2.782 7.438l.94-.94 1.945 1.939L9.89 4.215l.94.946-5.162 5.162Z"
              />
            </svg>
            Quiz 1:
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              fill="none"
              viewBox="0 0 14 14"
              className="mb-1 ml-3 mr-2 inline"
            >
              <path
                fill="#111827"
                d="M6.334 10.99h1.333V9.657H6.334v1.333ZM7.001.323A6.67 6.67 0 0 0 .334 6.99a6.67 6.67 0 0 0 6.667 6.667 6.67 6.67 0 0 0 6.666-6.667A6.67 6.67 0 0 0 7.001.323Zm0 12A5.34 5.34 0 0 1 1.667 6.99a5.34 5.34 0 0 1 5.334-5.333 5.34 5.34 0 0 1 5.333 5.333 5.34 5.34 0 0 1-5.333 5.333ZM7 2.99a2.666 2.666 0 0 0-2.667 2.667h1.333c0-.734.6-1.334 1.334-1.334.733 0 1.333.6 1.333 1.334 0 1.333-2 1.166-2 3.333h1.333c0-1.5 2-1.667 2-3.333A2.666 2.666 0 0 0 7.001 2.99Z"
              />
            </svg>
            Why, What, When
          </h3>
          <button className="flex w-fit items-center gap-2 rounded-lg border border-border px-4 py-2 text-primary hover:bg-secondary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="15"
              fill="none"
              viewBox="0 0 14 15"
            >
              <path
                fill="currentColor"
                d="M14 8.7H8v6H6v-6H0v-2h6v-6h2v6h6v2Z"
              />
            </svg>
            <span className="font-bold">Content</span>
          </button>
        </div>

        <div className="mt-4 flex items-center justify-between rounded-lg border border-border bg-sidebar p-4">
          <h3 className="">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              fill="none"
              viewBox="0 0 14 14"
              className="mb-1 mr-2 inline"
            >
              <path
                fill="#111827"
                d="M7 .323A6.67 6.67 0 0 0 .335 6.99a6.67 6.67 0 0 0 6.667 6.667 6.67 6.67 0 0 0 6.666-6.667A6.67 6.67 0 0 0 7.001.323Zm-1.333 10L2.782 7.438l.94-.94 1.945 1.939L9.89 4.215l.94.946-5.162 5.162Z"
              />
            </svg>
            Lesson 2:
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="14"
              fill="none"
              viewBox="0 0 12 14"
              className="mb-1 ml-3 mr-2 inline"
            >
              <path
                fill="#111827"
                d="M7.333.323H1.999c-.733 0-1.326.6-1.326 1.334L.666 12.323c0 .734.593 1.334 1.327 1.334h8.006c.734 0 1.334-.6 1.334-1.334v-8l-4-4Zm-5.334 12V1.657h4.667V4.99h3.333v7.333H2Z"
              />
            </svg>
            test.pdf
          </h3>
          <div className="flex items-center gap-4">
            <button className="flex w-fit items-center gap-2 rounded-lg border border-border px-4 py-2 text-primary hover:bg-secondary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="15"
                fill="none"
                viewBox="0 0 14 15"
              >
                <path
                  fill="currentColor"
                  d="M14 8.7H8v6H6v-6H0v-2h6v-6h2v6h6v2Z"
                />
              </svg>
              <span className="font-bold">Content</span>
            </button>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="10"
              height="5"
              fill="none"
              viewBox="0 0 10 5"
              className="cursor-pointer hover:text-primary"
            >
              <path
                fill="currentColor"
                d="m9.016.765-3.75 3.75a.375.375 0 0 1-.531 0L.985.765a.375.375 0 0 1 .265-.64h7.5a.375.375 0 0 1 .266.64Z"
              />
            </svg>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between rounded-lg border border-border bg-sidebar p-4">
          <h3 className="">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="14"
              fill="none"
              viewBox="0 0 16 14"
              className="mb-1 mr-2 inline"
            >
              <path
                fill="#F69C08"
                d="M.666 13.29h14.667L7.999.623.666 13.29Zm8-2H7.333V9.957h1.333v1.333Zm0-2.667H7.333V5.29h1.333v3.333Z"
              />
            </svg>
            Unpublished Assignment:
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="14"
              fill="none"
              viewBox="0 0 12 14"
              className="mb-1 ml-3 mr-2 inline"
            >
              <path
                fill="#111827"
                d="M7.333.323H1.999c-.733 0-1.326.6-1.326 1.334L.666 12.323c0 .734.593 1.334 1.327 1.334h8.006c.734 0 1.334-.6 1.334-1.334v-8l-4-4Zm-5.334 12V1.657h4.667V4.99h3.333v7.333H2Z"
              />
            </svg>
            test.pdf
          </h3>
          <button className="flex w-fit items-center gap-2 rounded-lg border border-border px-4 py-2 text-primary hover:bg-secondary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="15"
              fill="none"
              viewBox="0 0 14 15"
            >
              <path
                fill="currentColor"
                d="M14 8.7H8v6H6v-6H0v-2h6v-6h2v6h6v2Z"
              />
            </svg>
            <span className="font-bold">Content</span>
          </button>
        </div>

        <button className="mb-8 mt-4 flex w-fit items-center gap-2 rounded-lg border border-border bg-sidebar px-4 py-2 text-primary hover:bg-secondary">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="15"
            fill="none"
            viewBox="0 0 14 15"
          >
            <path fill="currentColor" d="M14 8.7H8v6H6v-6H0v-2h6v-6h2v6h6v2Z" />
          </svg>
          <span className="font-bold">Curriculum item</span>
        </button>
      </div>

      <button className="mb-12 mt-4 flex w-fit items-center gap-2 rounded-lg border border-border bg-container px-12 py-2 text-primary hover:bg-secondary">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="15"
          fill="none"
          viewBox="0 0 14 15"
        >
          <path fill="currentColor" d="M14 8.7H8v6H6v-6H0v-2h6v-6h2v6h6v2Z" />
        </svg>
        <span className="font-bold">Section</span>
      </button>
    </div>
  );
};
