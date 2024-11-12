export default function Container(parent: Element) {
  const container = document.createElement("div");
  container.classList.add("container");

  parent.appendChild(container);
  return container;
}
