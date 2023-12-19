import type { RouteProp } from '@react-navigation/native';

import * as React from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { useForm } from 'rc-field-form';
import { noop, startCase } from 'lodash';
import { useRoute } from '@react-navigation/native';

import type { MainStackParams } from '@app/navigation';
import type { SubmitFeedbackMutationVariables } from '@app/generated/server.gql';

import { Form } from '@app/components/form';
import { Group } from '@app/components/group';
import { Input } from '@app/components/input';
import { castError } from '@app/lib/cast.error';
import { Select } from '@app/components/select';
import { Button } from '@app/components/button';
import { useTheme } from '@app/lib/hooks/use.theme';
import { ModalHeader } from '@app/components/modal.header';
import { useExitPage } from '@app/lib/hooks/use.exit.page';
import { useToast } from '@app/components/toast/use.toast';
import { RatingSelect } from '@app/components/rating.select';
import { PageContainer } from '@app/components/page.container';
import { LoadingOverlay } from '@app/components/loading.overlay';
import {
  FeedbackType,
  useSubmitFeedbackMutation,
} from '@app/generated/server.gql';

export const FeedbackPage: React.FC = () => {
  const route = useRoute<RouteProp<MainStackParams, 'Feedback'>>();
  const exit = useExitPage();
  const toast = useToast();
  const theme = useTheme();
  const [submit, { loading: submitting }] = useSubmitFeedbackMutation();
  const [form] = useForm();

  async function handleSubmit(payload: unknown) {
    try {
      await submit({
        variables: {
          ...(payload as SubmitFeedbackMutationVariables),
        },
      });
      toast({
        description: 'We appreciate your feedback',
        preset: 'success',
        title: 'Feedback submitted!',
      });
    } catch (error) {
      toast({
        description: castError(error).message,
        preset: 'error',
        title: 'Error!',
      });
    } finally {
      exit();
    }
  }

  React.useEffect(() => {
    form.setFieldsValue({
      message: route.params?.message,
      rating: route.params?.rating ?? 2,
      type: route.params?.type ?? FeedbackType.QUESTION,
    });
  }, [route.params, form]);

  return (
    <PageContainer>
      <ModalHeader
        onClose={submitting ? noop : exit}
        subtitle={'Feel free to share your feedback with us!'}
        title="Feedback"
        withClose
      />
      <KeyboardAwareScrollView
        contentContainerStyle={{
          flexGrow: 1,
        }}
      >
        <Group
          flexGrow={1}
          paddingHorizontal={'medium'}
          paddingVertical={'large'}
        >
          <LoadingOverlay isLoading={submitting} type="blur" />
          <Form form={form} onFinish={handleSubmit}>
            <Group flexGrow={1} gap={'medium'}>
              <Form.Field
                hideError
                initialValue={2}
                name="rating"
                rules={[{ required: true }]}
              >
                <RatingSelect />
              </Form.Field>
              <Group gap={'small'}>
                <Form.Field
                  hideError
                  initialValue={FeedbackType.QUESTION}
                  name="type"
                  noStyle
                  rules={[{ required: true }]}
                >
                  <Select
                    options={[
                      FeedbackType.QUESTION,
                      FeedbackType.FEATURE_REQUEST,
                      FeedbackType.BUG_REPORT,
                    ].map((value) => ({
                      label: startCase(value.toLowerCase()),
                      value,
                    }))}
                  />
                </Form.Field>
                <Form.Field
                  hideError
                  name="message"
                  rules={[{ required: true }]}
                >
                  <Input
                    autoFocus
                    blurOnSubmit
                    enterKeyHint="send"
                    multiline
                    numberOfLines={5}
                    onSubmitEditing={() => form.submit()}
                    placeholder="Tell us about your experience"
                    size="medium"
                    style={{
                      alignContent: 'flex-start',
                      alignItems: 'flex-start',
                      borderRadius: theme.borderRadius,
                      justifyContent: 'flex-start',
                      minHeight: 200,
                    }}
                  />
                </Form.Field>
              </Group>
              <Group flexGrow={1} style={{ justifyContent: 'flex-end' }}>
                <Button
                  isLoading={submitting}
                  isSolid
                  onPress={() => form.submit()}
                  size="large"
                  type="primary"
                >
                  Send
                </Button>
              </Group>
            </Group>
          </Form>
        </Group>
      </KeyboardAwareScrollView>
    </PageContainer>
  );
};
