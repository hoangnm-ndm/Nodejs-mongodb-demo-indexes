const categories = [
	{
		id: 1,
		name: "Chuyên mục 1",
	},
	{
		id: 2,
		name: "Chuyên mục 2",
		children: [
			{
				id: 4,
				name: "Chuyên mục 2.1",
			},
			{
				id: 5,
				name: "Chuyên mục 2.2",
				children: [
					{
						id: 10,
						name: "Chuyên mục 2.2.1",
					},
					{
						id: 11,
						name: "Chuyên mục 2.2.2",
					},
					{
						id: 12,
						name: "Chuyên mục 2.2.3",
					},
				],
			},
			{
				id: 6,
				name: "Chuyên mục 2.3",
			},
		],
	},
	{
		id: 3,
		name: "Chuyên mục 3",
		children: [
			{
				id: 7,
				name: "Chuyên mục 3.1",
			},
			{
				id: 8,
				name: "Chuyên mục 3.2",
			},
			{
				id: 9,
				name: "Chuyên mục 3.3",
			},
		],
	},
];

// Output:
// printCategories
/**
* <select>
  <option value="1">Chuyên mục 1</option>
  <option value="2">Chuyên mục 2</option>
  <option value="4">|--Chuyên mục 2.1</option>
  <option value="5">|--Chuyên mục 2.2</option>
  <option value="10">|--|--Chuyên mục 2.2.1</option>
  <option value="11">|--|--Chuyên mục 2.2.2</option>
  <option value="12">|--|--Chuyên mục 2.2.3</option>
  <option value="6">|--Chuyên mục 2.3</option>
  <option value="3">Chuyên mục 3</option>
  <option value="7">|--Chuyên mục 3.1</option>
  <option value="8">|--Chuyên mục 3.2</option>
  <option value="9">|--Chuyên mục 3.3</option>
</select>
*/

function printCategories(categories, level = 0) {
	let content = "";
	const prefix = "|--".repeat(level);
	for (const category of categories) {
		content += `<option value="${category.id}">${prefix}${category.name}</option>`;
		if (category.children) {
			content += printCategories(category.children, level + 1);
		}
	}
	return content;
}

const content = printCategories(categories);

document.write(`<select>${content}</select>`);
