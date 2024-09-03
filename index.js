let list = ["life,", "materials,", "technology,", "regeneration,", "..."];
let extraOptions = [
  "creativity,",
  "sustainability,",
  "innovation,",
  "collaboration,",
  "community,",
  "craftsmanship,",
  "resilience,",
  "adaptability,",
  "connection,",
  "inspiration,",
  "transformation,",
  "vision,",
];

let navRightList = document.querySelector(".nav--right-list");
let navLeft = document.querySelector(".nav--left"); // Get the "nav--left" div
let displayText = document.querySelector(".display-text");
let navLeftTextSpan = document.querySelector(".nav--left-text span");

let expanded = false; // Track if the list is expanded
let selectedItem = null; // Track the selected item

function updateList(selected = null) {
  navRightList.innerHTML = ""; // Clear the list

  let displayedItems = expanded
    ? [...list.slice(0, -1), ...extraOptions, "<"]
    : list;

  displayedItems.forEach((item) => {
    let listItem = document.createElement("li");
    listItem.textContent = item;

    // Set color: "..." and "<" are always black; other items depend on selection
    if (item === "..." || item === "<") {
      listItem.style.color = "black";
    } else if (selectedItem && item === selectedItem) {
      listItem.style.color = "black"; // Selected item is black
    } else if (selectedItem) {
      listItem.style.color = "#B3B3B3"; // Non-selected items are gray after a selection
    } else {
      listItem.style.color = "black"; // Default state for all items is black
    }

    listItem.addEventListener("click", () => {
      if (item === "...") {
        if (!expanded) {
          expanded = true; // Expand the list

          // Append a new div using template literals
          const newDiv = document.createElement("div");
          newDiv.classList.add("new-content");
          newDiv.innerHTML = `
          <div class="menuContent">
            <div class="menuContentItem studio"> Studio </div>
            <div class="menuContentItem news"> News </div>
            <div class="menuContentItem people"> People </div>
            <div class="menuContentItem contact"> Content </div>
          </div>
          `;

          navLeft.appendChild(newDiv);

          updateList();
        }
      } else if (item === "<") {
        if (selectedItem && extraOptions.includes(selectedItem)) {
          // Insert the selected extra item at index 3
          list.splice(3, 0, selectedItem);

          // Ensure the list array does not exceed 5 items
          if (list.length > 5) {
            let removedItem = list.splice(4, 1)[0]; // Remove the item at index 4
            extraOptions.push(removedItem); // Add the removed item to extraOptions
          }

          // Remove the selected item from extraOptions
          extraOptions = extraOptions.filter(
            (option) => option !== selectedItem
          );
        }
        expanded = false; // Collapse the list

        // Remove the appended div
        const appendedDiv = document.querySelector(".new-content");
        if (appendedDiv) {
          navLeft.removeChild(appendedDiv);
        }

        updateList(); // Refresh the list while retaining the selected item
      } else if (extraOptions.includes(item) || list.includes(item)) {
        selectedItem = item; // Track the selected item
        updateList(item); // Highlight the selected item and update text
      }

      // Update the text content based on the selected item
      updateTextContent(selectedItem || item);
    });

    navRightList.appendChild(listItem);
  });
}

function updateTextContent(item) {
  if (item === "life," || item === "materials,") {
    navLeftTextSpan.textContent = " designs qualities of";
    displayText.textContent =
      "where spaces are built with craft to nurture the well-being and vitality of communities.";
  } else if (item === "technology,") {
    navLeftTextSpan.textContent = " integrates innovation into daily life";
    displayText.textContent =
      "where cutting-edge solutions are woven into the fabric of everyday experiences.";
  } else if (item === "regeneration,") {
    navLeftTextSpan.textContent = " revitalizes environments and communities";
    displayText.textContent =
      "where sustainability meets renewal to foster enduring connections.";
  } else if (item === "creativity," || item === "inspiration,") {
    navLeftTextSpan.textContent = " fosters a culture of";
    displayText.textContent =
      "where imagination and originality drive progress and change.";
  } else if (item === "sustainability," || item === "resilience,") {
    navLeftTextSpan.textContent = " commits to";
    displayText.textContent =
      "where long-term thinking ensures the endurance and adaptability of systems.";
  } else if (item === "innovation," || item === "transformation,") {
    navLeftTextSpan.textContent = " leads through";
    displayText.textContent =
      "where forward-thinking solutions revolutionize the way we live and work.";
  } else if (item === "collaboration," || item === "community,") {
    navLeftTextSpan.textContent = " builds strong";
    displayText.textContent =
      "where collective effort and shared purpose bring about significant impact.";
  } else if (item === "craftsmanship," || item === "adaptability,") {
    navLeftTextSpan.textContent = " values the";
    displayText.textContent =
      "where attention to detail and flexibility create spaces that are both beautiful and functional.";
  } else if (item === "connection," || item === "vision,") {
    navLeftTextSpan.textContent = " connects";
    displayText.textContent =
      "where relationships and foresight are the foundation for a better future.";
  } else {
    displayText.textContent = "";
  }
}

// Initial rendering of the list with everything black
updateList();
