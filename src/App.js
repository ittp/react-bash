import React from "react";
import Terminal from "react-bash";
import renderHTML from "react-render-html";
import "./styles.css";

const sudo = {
  exec: ({ structure, history, cwd }) => {
    return {
      structure,
      cwd,
      history: history.concat({ value: "Nice try... (ಠ(ಠ(ಠ_ಠ)ಠ)ಠ)" })
    };
  }
};

export default function App() {
  const open = {
    exec: ({ structure, state, history }, command) => {
      const parsedCommand = history[1].value.split(" ");
      const fileName = parsedCommand[1];

      if (fileName === "resume.pdf") {
        return (
          window.open(
            "https://github.com/kylegrantlucas/resume/raw/master/output/kyle_modern.pdf"
          ),
          structure,
          state,
          history
        );
      }
    }
  };

  const extensions = { open, sudo };

  const structure = {
    src: {
      file1: { content: "This is the text content for <file1> of <src>" },
      file2: { content: "This is the text content for <file2> of <src>" },
      childDir1: {
        file: {
          content: "This is the text content for <file> of <src/childDir1>"
        }
      },
      childDir2: {}
    },
    ".hiddenDir": {},
    ".hiddenFile": { content: "This is a hidden file" },
    "about.txt": {
      content: "This is the text content for <file> of the root directory"
    },
    "resume.pdf": {
      content: renderHTML(
        `You can find my resume here: <a href="https://github.com/kylegrantlucas/resume/blob/master/output/kyle_modern.pdf">https://github.com/kylegrantlucas/resume/blob/master/output/kyle_modern.pdf</a>`
      )
    }
  };

  const history = [
    {
      value: renderHTML(`Welcome to my terminal 🎉
                        <br><br>
                        I'm Kyle Lucas, a Software Engineer from Los Angeles, California.
                        <br><br>
                        If you'd like to learn more about me run \`cat README.md\` without the backticks.
                        <br><br>
                        Other Examples:
                        <br>\`ls\` - list all files & directories
                        <br>\`ls work/previous\` - list files about my previous work
                        <br>\`ls projects\` - list files about my projects
                        <br>\`open resume.pdf\` - Open my resume
                        <br>\`cat work/current/fender.md\` - View information about my current work
                        <br>\`cat projects/go/plex-latmetric.md\` - View information about my plex-lametric project
                        <br><br>`)
    }
  ];

  const prefix = "taseen@ubuntu";

  return (
    <div className="App">
      <Terminal
        prefix={prefix}
        structure={structure}
        // theme={Terminal.Themes.DARK}
        history={history}
        extensions={extensions}
      />
    </div>
  );
}
