document.addEventListener("readystatechange", (event) => {
	if (event.target.readyState === "complete") {
		console.log("readyState: Complete");
		document.getElementById("loading-screen").style.display = "none";
		initApp();
	}
});

/**
 * Counts up the given html element
 * @param {HTMLElement} counterElement The counting element
 */
function count(counterElement) {
	// console.log("Counting");
	let currentValue = parseInt(counterElement.textContent);
	const endValue = parseInt(counterElement.getAttribute("data-val"));
	if (currentValue == endValue) {
		return;
	}
	const divisions = 399;
	const increment = endValue / divisions;
	const numFormatObject = new Intl.NumberFormat("en-US");
	// for (; currentValue < endValue; currentValue += time) {
	// 	counterElement.innerText = Math.ceil(currentValue);
	// 	setTimeout(count, 1);
	// }
	const animate = () => {
		if (currentValue < endValue) {
			counterElement.textContent = numFormatObject.format(
				Math.ceil(currentValue)
			);
			currentValue += increment;
			// console.log(currentValue);
			setTimeout(animate, 1);
		} else {
			console.log("Counting complete " + endValue);
			counterElement.textContent = numFormatObject.format(endValue);
			return;
		}
	};
	animate();
	return;
}

const initApp = () => {
	const boxes = document.querySelectorAll(".block");

	for (let index = 0; index < boxes.length; index++) {
		const box = boxes[index];
		console.log(box);
		box.addEventListener("mouseover", (event) => {
			console.log("Hovering");
			box.style.backgroundColor = "lightblue";
			event.target.textContent = "Hovering";
		});
		box.addEventListener("click", (event) => {
			console.log("Clicked");
			box.style.backgroundColor = "blueviolet";
			event.target.textContent = "Clicked!";
		});
		box.addEventListener("mouseout", (event) => {
			console.log("Exited");
			box.style.backgroundColor = "aliceblue";
			event.target.textContent = "Float Block";
		});
	}

	// const anchor = document.querySelector("footer a");
	// console.log(anchor);

	// let scamState = 0;

	// anchor.addEventListener("mouseover", (event) => {
	// 	if (scamState === 0) {
	// 		console.log("Scammed");
	// 		footer.style.textAlign = "right";
	// 		event.target.textContent = "Can't touch me";
	// 		scamState = 1;
	// 	} else if (scamState === 1) {
	// 		footer.style.textAlign = "center";
	// 		event.target.textContent = "Nope";
	// 		scamState = 2;
	// 	} else if (scamState === 2) {
	// 		footer.style.textAlign = "right";
	// 		footer.style.backgroundColor = "lightblue";
	// 		event.target.textContent = "Ok u win";
	// 		scamState = 3;
	// 	}
	// });
	// anchor.addEventListener("click", (event) => {
	// 	console.log("Back to top");
	// 	footer.style.textAlign = "left";
	// 	footer.style.backgroundColor = null;
	// 	event.target.textContent = "Back to top";
	// 	scamState = 0;
	// });

	const articles = document.querySelectorAll("article");
	const titles = document.querySelectorAll(".tableOfContents > ol > li > a");
	const counterElements = document.querySelectorAll(".counter");
	const counterTriggered = new Array(counterElements.length);
	for (let i = 0; i < counterElements.length; i++) {
		counterTriggered[i] = false;
	}

	window.addEventListener("scroll", (event) => {
		const windowHeight = window.innerHeight;
		articles.forEach((article) => {
			const heading = article.querySelector("h2");
			const rect = article.getBoundingClientRect();
			if (
				!(rect.top >= 0 && rect.top < windowHeight / 4) &&
				!(rect.bottom <= windowHeight && rect.bottom >= windowHeight / 4)
			) {
				return;
			}
			titles.forEach((title) => {
				if (
					heading.textContent.toLowerCase() !== title.textContent.toLowerCase()
				) {
					title.style.borderLeftWidth = "0";
					return;
				}
				title.style.borderLeftStyle = "groove";
				title.style.borderLeftColor = "blueviolet";
				title.style.borderLeftWidth = "5px";
				// title.style.color = "black";
				// title.style.fontWeight = "bold";
				// title.style.color = "darkmagenta";
				// title.style.fontSize = "1.3rem";
			});
		});
		let i = 0;
		counterElements.forEach((counterElement) => {
			const rect = counterElement.getBoundingClientRect();
			if (
				(rect.top >= 0 && rect.top < windowHeight) ||
				(rect.bottom <= windowHeight && rect.bottom >= 0)
			) {
				if (counterTriggered[i] === false) {
					count(counterElement);
					counterTriggered[i] = true;
				}
			}
			i++;
		});
	});
};
