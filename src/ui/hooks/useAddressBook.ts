import {
  addAddress,
  removeAddress,
  selectAddress,
  updateAddresses,
} from "../../core/reducers/addressBookSlice";
import { Address } from "@/types";
import React from "react";
import { useAppDispatch, useAppSelector } from "../../core/store/hooks";

import transformAddress, { RawAddressModel } from "../../core/models/address";
import databaseService from "../../core/services/databaseService";

export default function useAddressBook() {
  const dispatch = useAppDispatch();
  const addresses = useAppSelector(selectAddress);
  const [loading, setLoading] = React.useState(true);

  const [fetching, setFetching] = React.useState(false);

  const updateDatabase = React.useCallback(() => {
    databaseService.setItem("addresses", addresses);
  }, [addresses]);

   /** Fetch addresses from backend API */
   const fetchAddresses = async (houseNumber: string, postCode: string) => {
    setFetching(true);
    try {
      const BASE_URL = process.env.NEXT_PUBLIC_URL || "http://localhost:3000";
      const res = await fetch(
        `${BASE_URL}/api/getAddresses?postcode=${encodeURIComponent(
          postCode
        )}&streetnumber=${encodeURIComponent(houseNumber)}`
      );

      if (!res.ok) throw new Error(`API error: ${res.status}`);

      const data = await res.json();

      // data.details is the array
      const transformed = (data.details || []).map((addr) =>
        transformAddress({ ...addr, houseNumber })
      );

      return transformed;
    } catch (err) {
      console.error(err);
      throw err;
    } finally {
      setFetching(false);
    }
  };


  return {
    /** Add address to the redux store */
    addAddress: (address: Address) => {
      dispatch(addAddress(address));
      updateDatabase();
    },
    /** Remove address by ID from the redux store */
    removeAddress: (id: string) => {
      dispatch(removeAddress(id));
      updateDatabase();
    },
    /** Loads saved addresses from the indexedDB */
    loadSavedAddresses: async () => {
      const saved: RawAddressModel[] | null = await databaseService.getItem(
        "addresses"
      );
      // No saved item found, exit this function
      if (!saved || !Array.isArray(saved)) {
        setLoading(false);
        return;
      }
      dispatch(
        updateAddresses(saved.map((address) => transformAddress(address)))
      );
      setLoading(false);
    },
    fetching,
    fetchAddresses,
    loading,
  };
}
