import BlockedButton from "@/components/BlockedButton";
import { useAuth } from "@/stores/auth";

export default function Home() {
  const revoke = useAuth((state) => state.revoke);
  return (
    <BlockedButton
      onPress={() => {
        revoke();
      }}
    ></BlockedButton>
  );
}
