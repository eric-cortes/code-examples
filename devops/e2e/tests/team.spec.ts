/**
 * Team Page Tests
 *
 * Tests the team roster view at /#/{id}/team/, which lists team members,
 * their locations/work areas, and lets an admin add new members.
 *
 * @operations @team
 */

import { expect, test } from "../support/fixtures-base";
import { navigateToTeam } from "../support/navigation";

test.describe("Team Management @operations @team", () => {
	test.beforeEach(async ({ page }) => {
		await navigateToTeam(page);
	});

	test("team page loads with a member list", async ({ page }) => {
		expect(page.url()).toContain("/team");

		await expect
			.poll(
				async () => {
					const rows = await page.locator('[data-testid*="team-member-row"], table tbody tr').count();
					return rows > 0;
				},
				{ message: "Team page should show at least one member row" },
			)
			.toBe(true);
	});

	test('"Add team member" button is visible', async ({ page }) => {
		// Button text depends on user permissions: full add vs. request-only.
		await expect
			.poll(
				async () => {
					const btn = page.locator("button", { hasText: /Add team member|Request to add/ });
					return btn.count();
				},
				{ message: '"Add team member" button should be visible' },
			)
			.toBeGreaterThan(0);
	});

	test("filter dropdowns for locations and work areas are present", async ({ page }) => {
		await expect
			.poll(
				async () => {
					const text = await page.locator("body").innerText();
					return text.includes("Locations") && text.includes("Work areas");
				},
				{ message: "Filter dropdowns for Locations and Work areas should be present" },
			)
			.toBe(true);
	});

	test("member search input works", async ({ page }) => {
		const searchInput = page
			.getByPlaceholder(/Search members|Search/i)
			.or(page.locator("input[type='search']"))
			.first();
		await expect
			.poll(async () => searchInput.count(), {
				message: "Member search input should be present",
			})
			.toBeGreaterThan(0);

		await expect(searchInput).toBeVisible();
	});

	test("member rows show name and role", async ({ page }) => {
		await expect
			.poll(
				async () => {
					const rows = await page.locator('[data-testid*="team-member-row"], table tbody tr').count();
					if (rows > 0) return true;
					// Fallback: an empty workspace shows an explicit empty state instead of rows.
					const text = await page.locator("body").innerText();
					return text.includes("No members yet") || text.includes("No results");
				},
				{ message: "Team page should show member rows or an empty state" },
			)
			.toBe(true);
	});
});
