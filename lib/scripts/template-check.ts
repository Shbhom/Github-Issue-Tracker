import MarkdownIt from "markdown-it";

const parser = new MarkdownIt();

const issueBody = process.argv[2];

const parsedContent = parser.render(issueBody);

const requiredSections = [
  "What",
  "Short Description",
  "Expected Behavior",
  "Seeing",
  "Environment",
];

let errorMessage = "";

requiredSections.forEach((section) => {
  const sectionStart = parsedContent.indexOf(
    `<h4 id="${section}">${section}</h4>`,
  );
  const sectionEnd = parsedContent.indexOf('<h4 id="', sectionStart + 1);

  if (
    sectionStart === -1 ||
    sectionEnd === -1 ||
    parsedContent.substring(sectionStart, sectionEnd).trim() === ""
  ) {
    errorMessage += ` - Missing or empty "${section}" section.\n`;
  }
});

if (errorMessage) {
  console.error("Issue template format is invalid:\n" + errorMessage);
  process.exit(1); // Exit with a failure status
} else {
  console.log("Issue template format is valid!");
  process.exit(0); // Exit with a success status
}
