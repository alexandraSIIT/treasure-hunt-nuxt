<template>
    <v-dialog v-model="open" max-width="500px">
        <v-card>
          <v-card-title>
            <span>Game over!</span>
            <v-spacer></v-spacer>
            <p>
                Congratulations everyone for finishing this race, we're very proud of you!

                Special thanks are going to Garmin Cluj for making this event possible and also
                to BringIT Team Cluj for organizing this event with &#10084;!
             </p>
            </v-card-title>
          <v-card-actions>
            <v-btn color="primary" flat @click.stop="open=false">Close</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
</template>
<script>
export default {
    props: ['open'],
//   data: () => ({
//       dialog: true,
//   })
}
</script>