import React from "react";
import { Box, VStack, Heading, Text } from "@chakra-ui/react";

const GoFundMeSection = () => {
  // Dynamically choose medium/small based on viewport width
  const [src, setSrc] = React.useState(
    "https://www.gofundme.com/f/support-a-memorial-bench-for-jemanual-concepcion/widget/medium",
  );

  React.useEffect(() => {
    const update = () =>
      setSrc(
        "https://www.gofundme.com/f/support-a-memorial-bench-for-jemanual-concepcion/widget/medium",
      );
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return (
    <Box mt={10} mb={8} p={6} bg="yellow.50" borderRadius="md" boxShadow="sm">
      <VStack align="stretch" spacing={4}>
        <Heading as="h2" textAlign="center" mb={2} color="gray.700">
          Help Honor Jemanual
        </Heading>

        <Text fontSize="md" color="gray.600" textAlign="left" px={10} py={3}>
          We’re raising funds for a memorial bench in Tacoma to celebrate
          Jemanual Concepcion. An inspiring runner, cyclist, and friend who
          always made sure no one was left behind. The bench will be a place to
          reflect, rest, and remember the joy and community he shared with
          everyone.
        </Text>

        {/* GoFundMe iframe */}
        <Box
          mt={2}
          display="flex"
          justifyContent="center"
          alignItems="center"
          overflow="hidden"
          lineHeight="0"
        >
          <iframe
            title="GoFundMe - Support a Memorial Bench for Jemanual Concepcion"
            src={src}
            style={{
              width: "100%",
              maxWidth: 480,
              height: 300, // reduce height from 520 → 300
              border: "none",
              display: "block",
            }}
          />
        </Box>
      </VStack>
    </Box>
  );
};

export default GoFundMeSection;
