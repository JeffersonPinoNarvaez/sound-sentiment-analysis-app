<template>
  <div>
    <tapir-widget :time="2" :customUpload="customUp" buttonColor="green" />
  </div>
</template>

<script>
import TapirWidget from 'vue-audio-tapir';
import 'vue-audio-tapir/dist/vue-audio-tapir.css';

export default {
  components: {
    TapirWidget,
  },
  methods: {
    async customUp(blob) {
      console.log('custom Upload code!');
      const formData = new FormData();
      const uniqueFileName = `file_${Date.now()}_${Math.floor(Math.random() * 1000)}.wav`;
      formData.append('wavFile', blob, uniqueFileName);
      try {
        const response = await fetch('http://localhost:3000/v1/api/core/sound-classifier/uploads', {
          method: 'POST',
          body: formData,
        });
        if (!response.ok) {
          return false;
        }
        console.log('File uploaded successfully.');
        return true;
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    },
  },
};
</script>

<style></style>
