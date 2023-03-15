export default {
  title: "Theme",
  name: "theme",
  type: "string",
  description: "Choose a background color",
  validation: (Rule) => Rule.required(),
  options: {
    list: [
      { title: "White", value: "white" },
      { title: "Gray", value: "gray" },
    ],
    layout: "radio",
    direction: "horizontal",
  },
};
