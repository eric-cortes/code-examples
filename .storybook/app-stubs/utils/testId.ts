export interface WithTestID {
	testID: string;
}

export function testIdProps(testID?: string): { "data-testid"?: string } {
	return testID !== undefined ? { "data-testid": testID } : {};
}
