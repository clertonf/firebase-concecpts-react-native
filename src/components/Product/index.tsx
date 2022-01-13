import React from "react";
import firebase from "@react-native-firebase/firestore";
import { Alert } from "react-native";

import { ButtonIcon } from "../ButtonIcon";
import { Container, Info, Title, Quantity, Options } from "./styles";

export type ProductProps = {
  id: string;
  description: string;
  quantity: number;
  done: boolean;
};

type Props = {
  data: ProductProps;
};

export function Product({ data }: Props) {
  function handleDoneToggle() {
    firebase().collection("products").doc(data.id).update({
      done: !data.done,
    });
  }

  const handleDeleteProduct = () =>
    Alert.alert("Deseja realmente deletar o produto?", "", [
      {
        text: "Cancelar",
        onPress: () => {},
        style: "destructive",
      },
      { text: "Sim", onPress: () => confirmDeleteProduct() },
    ]);

  function confirmDeleteProduct() {
    firebase().collection("products").doc(data.id).delete();
  }

  return (
    <Container>
      <Info>
        <Title done={data.done}>{data.description}</Title>

        <Quantity>Quantidade: {data.quantity}</Quantity>
      </Info>

      <Options>
        <ButtonIcon
          icon={data.done ? "undo" : "check"}
          onPress={handleDoneToggle}
        />

        <ButtonIcon icon="delete" color="alert" onPress={handleDeleteProduct} />
      </Options>
    </Container>
  );
}
