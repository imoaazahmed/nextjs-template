import React from 'react';
import {
  Box,
  Container,
  Stack,
  Heading,
  RadioGroup,
  Radio,
  Input,
} from '@elements';
import { useApiPosts } from '@hooks/use-post-api';

export default function PlayGroundScreen(): JSX.Element {
  const { isLoading } = useApiPosts();

  if (isLoading) return <div>loading...</div>;

  return (
    <Box>
      <Container className='p-4'>
        <Stack className='mb-8'>
          <Heading as='h1'>Heading</Heading>
          <Heading as='h2'>Heading</Heading>
          <Heading as='h3'>Heading</Heading>
          <Heading as='h4'>Heading</Heading>
          <Heading as='h5'>Heading</Heading>
          <Heading as='h6'>Heading</Heading>
        </Stack>

        <Input name='' placeholder='Username' label='Username' />

        <Box className='mt-4'>
          <RadioGroup label='Radio group'>
            <Radio>Option 1</Radio>
            <Radio>Option 1</Radio>
            <Radio>Option 1</Radio>
          </RadioGroup>
        </Box>
      </Container>
    </Box>
  );
}
