// autobind decorator
function autobind(
  _target: any,
  _methodName: string,
  discriptor: PropertyDescriptor
) {
  const originalMethod = discriptor.value;
  const adjDescriptor: PropertyDescriptor = {
    configurable: true,
    get() {
      const bindFn = originalMethod.bind(this);
      return bindFn;
    },
  };
  return adjDescriptor;
}
// ProjectInput Class
class ProjectInput {
  templateElement: HTMLTemplateElement;
  hostElement: HTMLElement;
  element: HTMLElement;
  titleInputElement: HTMLInputElement;
  descriptionInputElement: HTMLInputElement;
  mandayInputElement: HTMLInputElement;
  constructor() {
    this.templateElement = document.getElementById(
      "project-input"
    )! as HTMLTemplateElement;
    this.hostElement = document.getElementById("app")! as HTMLDivElement;
    const importedNode = document.importNode(
      this.templateElement.content,
      true
    );
    this.element = importedNode.firstElementChild as HTMLFormElement;
    this.element.id = "user-input";
    this.titleInputElement = this.element.querySelector(
      "#title"
    ) as HTMLInputElement;
    this.descriptionInputElement = this.element.querySelector(
      "#description"
    ) as HTMLInputElement;
    this.mandayInputElement = this.element.querySelector(
      "#manday"
    ) as HTMLInputElement;
    this.configure();
    this.attach();
  }
  private gatherUserInput(): [string, string, number] | void {
    const enterdTitle = this.titleInputElement.value;
    const enterdDescription = this.descriptionInputElement.value;
    const enterdManday = this.mandayInputElement.value;
    if (
      enterdTitle.trim().length === 0 ||
      enterdDescription.trim().length === 0 ||
      enterdManday.trim().length === 0
    ) {
      alert("入力値が正しく有りません。再度お試しください。");
      return;
    } else {
      return [enterdTitle, enterdDescription, +enterdManday];
    }
  }
  private clearInputs() {
    this.titleInputElement.value = "";
    this.descriptionInputElement.value = "";
    this.mandayInputElement.value = "";
  }
  @autobind
  private submitHandler(event: Event) {
    event.preventDefault;
    const userInput = this.gatherUserInput();
    if (Array.isArray(userInput)) {
      const [title, desc, manday] = userInput;
      alert([title, desc, manday]);
      this.clearInputs();
    }
  }
  private configure() {
    this.element.addEventListener("submit", this.submitHandler.bind(this));
  }
  private attach() {
    this.hostElement.insertAdjacentElement("afterbegin", this.element);
  }
}

const prjInput = new ProjectInput();
