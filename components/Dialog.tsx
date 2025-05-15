import { colors } from "@/constants/Colors";
import { AntDesign } from "@expo/vector-icons";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { ActivityIndicator, Modal, View } from "react-native";
import BlockedButton from "./BlockedButton";
import Text from "./Text";

const icons: Record<
  "warning" | "danger" | "info" | "success",
  {
    icon: keyof typeof AntDesign.glyphMap;
    tintColor: string;
    shadowColor: string;
    iconColor: string;
  }
> = {
  warning: {
    icon: "exclamation",
    tintColor: colors.warning[600],
    shadowColor: colors.warning[400],
    iconColor: colors.warning[900],
  },
  danger: {
    icon: "warning",
    tintColor: colors.danger[500],
    shadowColor: colors.danger[300],
    iconColor: colors.white,
  },
  info: {
    icon: "infocirlceo",
    tintColor: colors.info[500],
    shadowColor: colors.info[300],
    iconColor: colors.white,
  },
  success: {
    icon: "checkcircleo",
    tintColor: colors.success[500],
    shadowColor: colors.success[300],
    iconColor: colors.white,
  },
} as const;

export type DialogRef = {
  show: () => void;
  close: () => void;
};

export type DialogProps = {
  title?: string;
  text?: string;
  icon?: keyof typeof icons;
  confirmText?: string;
  onConfirm?: () => void;
  onClose?: () => void;
  loading?: boolean;
};

const Dialog = forwardRef<DialogRef, DialogProps>(
  ({ title, text, icon, confirmText, onConfirm, loading, onClose }, ref) => {
    const [visible, setVisible] = useState(false);
    const [state, setState] = useState();

    useImperativeHandle(
      ref,
      () => ({
        show: () => setVisible(true),
        close: () => setVisible(false),
      }),
      []
    );

    useEffect(() => {
      if (visible && onClose) {
        return () => {
          onClose();
        };
      }
    }, [visible]);

    return (
      <>
        {visible && (
          <View
            style={{
              backgroundColor: "#000",
              opacity: 0.4,
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 3,
            }}
          ></View>
        )}
        <Modal
          animationType="slide"
          visible={visible}
          presentationStyle="overFullScreen"
          transparent
        >
          <View
            style={{
              flex: 1,
              justifyContent: "flex-end",
              padding: 24,
              paddingBottom: 32,
            }}
          >
            <View
              style={{
                backgroundColor: colors.white,
                borderRadius: 20,
                overflow: "hidden",
              }}
            >
              {icon && (
                <View
                  style={{
                    width: 96,
                    height: 96,
                    borderRadius: 96 / 2,
                    backgroundColor: icons[icon].tintColor,
                    borderWidth: 8,
                    borderColor: icons[icon].shadowColor,
                    alignSelf: "center",
                    margin: 24,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <AntDesign
                    name={icons[icon].icon}
                    size={32}
                    color={icons[icon].iconColor}
                  />
                </View>
              )}

              <Text
                font="Nunito_800ExtraBold"
                size="extraLarge"
                style={{ textAlign: "center" }}
              >
                {title}
              </Text>
              <Text
                style={{ textAlign: "center", color: colors.grayscale[700] }}
              >
                {text}
              </Text>
              <View
                style={{
                  marginTop: 24,
                  padding: 24,
                  flexDirection: "row",
                  justifyContent: "center",
                  gap: 16,
                  backgroundColor: colors.grayscale[50],
                }}
              >
                {loading ? (
                  <ActivityIndicator
                    size="small"
                    color={colors.grayscale[500]}
                  />
                ) : (
                  <>
                    <BlockedButton
                      onPress={() => setVisible(false)}
                      style={{ flex: 1 }}
                      color="gray"
                    >
                      {confirmText ? "Batal" : "Tutup"}
                    </BlockedButton>
                    {confirmText && (
                      <BlockedButton
                        onPress={() => {
                          if (onConfirm) onConfirm();
                        }}
                        style={{ flex: 1 }}
                      >
                        {confirmText}
                      </BlockedButton>
                    )}
                  </>
                )}
              </View>
            </View>
          </View>
        </Modal>
      </>
    );
  }
);

export default Dialog;
