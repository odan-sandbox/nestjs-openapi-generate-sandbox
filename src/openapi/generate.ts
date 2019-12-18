import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { Test } from '@nestjs/testing';
import { AppModule } from '../app.module';

async function bootstrap(): Promise<void> {
  const controllers = Reflect.getMetadata('controllers', AppModule);
  const providers = Reflect.getMetadata('providers', AppModule);
  const mockedProviders = providers.map(provider => {
    return {
      provide: provider.name,
      useValue: {},
    };
  });

  const testingModule = await Test.createTestingModule({
    controllers: controllers,
    providers: mockedProviders,
  }).compile();

  const app = await testingModule.createNestApplication();

  const options = new DocumentBuilder()
    .setTitle('アドベントカレンダーサンプル')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  console.error(JSON.stringify(document, null, 2));
}
bootstrap();
