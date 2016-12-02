import path from 'path';
import NeDB from 'nedb';

const data = path.join(path.resolve('./'), 'data');
const collection = 'posts.db';
const seed = [
  {
    title: 'Test Post 1',
    subtitle: 'A Post in the Database',
    author: 'Bryan',
    content: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.',
  },
  {
    title: 'Test Post 2',
    subtitle: 'Another Post in the Database',
    author: 'Bryan',
    content: 'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.',
  },
  {
    title: 'Test Post 3',
    subtitle: 'A Third Post!',
    author: 'Bryan',
    content: 'Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?',
  },
]

const seedData = () => {
  console.log(`Writing ${collection} to ${data}`);
  const db = new NeDB({
    filename: path.join(data, collection),
    autoload: true,
    timestampData: true,
  });

  db.insert(seed, (err, newDoc) => {
    if (err) console.log(err);
    console.log(`Success added seed data!`);
  });
};

seedData();
