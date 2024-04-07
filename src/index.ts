import type { Element } from "hast";
import type { Plugin } from "unified/lib";
import { visit } from "unist-util-visit";

function detectLanguage(node: Element) {
  let classList = node.properties.className;

  if (!Array.isArray(classList)) {
    return;
  }

  for (let classItem of classList) {
    classItem = classList.toString();

    if (classItem.slice(0, 5) === "lang-") {
      return classItem.slice(5);
    }

    if (classItem.slice(0, 9) === "language-") {
      return classItem.slice(9);
    }
  }
}

const rehypePreLanguage: Plugin = () => {
  return tree => {
    visit(tree, "element", (node: Element, _, parent: Element) => {
      if (
        node.tagName !== "code" || !parent || parent.type !== "element"
        || parent.tagName !== "pre"
      ) {
        return;
      }

      const language = detectLanguage(node);

      parent.properties["data-language"] = language;
    });
  };
};

export default rehypePreLanguage;
