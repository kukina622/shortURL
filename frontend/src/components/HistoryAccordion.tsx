import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { urlInfoProp } from "@/types/url";

interface historyAccordionprop {
  urlInfo: urlInfoProp;
}

function HistoryAccordion({ urlInfo }: historyAccordionprop) {
  const [shortenHistory, setShortenHistory] = useState<[urlInfoProp] | []>([]);

  useEffect(() => {
    const check = localStorage.getItem("shortenHistory");
    if (check === null) {
      localStorage.setItem("shortenHistory", "[]");
    }
    const _shortenHistory = JSON.parse(
      localStorage.getItem("shortenHistory") as string
    );
    setShortenHistory(_shortenHistory);
    if (urlInfo.originUrl === "" || urlInfo.shortenUrl === "") return;
    localStorage.removeItem("shortenHistory");
    setShortenHistory((prev) => {
      const next = [...prev];
      next.unshift(urlInfo);
      localStorage.setItem("shortenHistory", JSON.stringify(next));
      return next as [urlInfoProp] | [];
    });
  }, [urlInfo.originUrl]);

  return (
    <Accordion defaultIndex={[0]} allowMultiple>
      {shortenHistory.map(({ originUrl, shortenUrl }: urlInfoProp, index) => (
        <AccordionItem key={index}>
          <AccordionButton
            borderWidth="1px"
            borderRadius="lg"
            bg="#805ad5"
            color="white"
            _hover={{ color: "white", bg : "#6b46c1" }}
          >
            <Box flex="1" textAlign="left">
              {shortenUrl}
            </Box>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel pb={4}>{originUrl}</AccordionPanel>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

export default HistoryAccordion;
