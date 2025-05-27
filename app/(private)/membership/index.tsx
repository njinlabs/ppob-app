import { getMembership, payMembership } from "@/api/membership";
import Dialog, { DialogRef } from "@/components/Dialog";
import Empty from "@/components/Empty";
import MembershipList from "@/components/MembershipList";
import { colors } from "@/constants/Colors";
import { useAuth } from "@/stores/auth";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "expo-router";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { FlatList } from "react-native";

export default function Membership() {
  const confirmRef = useRef<DialogRef>(null);
  const errorRef = useRef<DialogRef>(null);
  const successRef = useRef<DialogRef>(null);

  const user = useAuth((state) => state.user);

  const router = useRouter();

  const { setValue, handleSubmit } = useForm({
    defaultValues: {
      membershipId: "",
    },
  });

  const membershipQuery = useQuery({
    queryKey: ["membership-list"],
    queryFn: () => getMembership(),
  });

  const payMembershipMutation = useMutation({
    mutationFn: payMembership,
    onSuccess: () => {
      confirmRef.current?.close();
      successRef.current?.show();
    },
    onError: (e) => {
      confirmRef.current?.close();

      if ((e as AxiosError).response?.status === 405) {
        errorRef.current?.show();
      }
    },
  });

  const onPay = handleSubmit(({ membershipId }) =>
    payMembershipMutation.mutate(membershipId)
  );

  return (
    <>
      <FlatList
        data={
          !membershipQuery.data?.length && membershipQuery.isLoading
            ? (Array(4).fill({}) as unknown as Required<
                typeof membershipQuery.data
              >)
            : membershipQuery.data
        }
        style={{ flex: 1, backgroundColor: colors.grayscale[50], padding: 22 }}
        keyExtractor={(_, index) => `${index}`}
        contentContainerStyle={{
          flexGrow: !membershipQuery.data?.length ? 1 : undefined,
        }}
        ListEmptyComponent={
          <Empty
            title="Membership Masih Terbatas"
            text="Nantikan pilihan paket membership selanjutnya"
          />
        }
        renderItem={({ item }) => (
          <MembershipList
            style={{ marginBottom: 16 }}
            loading={membershipQuery.isLoading}
            onSelect={() => {
              setValue("membershipId", item.id);
              confirmRef.current?.show();
            }}
            title={item.name}
            active={item.id === user?.membershipId}
          >
            {item.description}
          </MembershipList>
        )}
      />
      <Dialog
        ref={confirmRef}
        title="Lanjutkan?"
        text="Kamu akan membeli paket membership ini"
        icon="info"
        confirmText="Ya"
        onConfirm={() => {
          onPay();
        }}
        loading={payMembershipMutation.isPending}
      />
      <Dialog
        ref={errorRef}
        title="Gagal"
        text="Saldo kamu tidak mencukupi"
        icon="danger"
      />
      <Dialog
        ref={successRef}
        title="Berhasil"
        text="Pembelian paket membership kamu berhasil"
        icon="success"
        onClose={() => {
          router.dismissAll();
        }}
      />
    </>
  );
}
