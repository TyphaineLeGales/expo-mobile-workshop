import { Stack } from "expo-router";

export default function PeopleLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: "#25292e" },
        headerTintColor: "#fff",
      }}
    >
      {/* The Stack component will automatically include all screens in the people folder */}
    </Stack>
  );
}