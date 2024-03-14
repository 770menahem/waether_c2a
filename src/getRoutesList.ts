import { writeFileSync } from 'fs';
import { initializeApp } from './initializeApp';

(async () => {
    const app = initializeApp(10).getApp();
    const r = app['_router'];
    const s = r.stack;
    const routes = getRoutes(s);
    console.log(routes);

    // Write routes to a file
    writeFileSync('./routers.json', JSON.stringify([...new Set(routes)]));
})();

// Function to extract routes from the router stack
function getRoutes(stack: any[], path: string[] = []): string[] {
    const routes: string[] = [];

    for (const layer of stack) {
        if (layer.route) {
            // Handle nested routes
            routes.push(...getRoutes(layer.route.stack, path.concat(split(layer.route.path))));
        } else if (layer.name === 'router' && layer.handle.stack) {
            // Handle nested routers
            routes.push(...getRoutes(layer.handle.stack, path.concat(split(layer.regexp))));
        } else if (layer.method) {
            // Add route to list
            routes.push(layer.method.toUpperCase() + ' ' + path.concat(split(layer.regexp)).filter(Boolean).join('/'));
        }
    }

    return routes;
}

// Function to split a path or regexp into an array of parts
function split(thing) {
    if (typeof thing === 'string') {
        return thing.split('/');
    } else if (thing.fast_slash) {
        return '';
    } else {
        const match = thing
            .toString()
            .replace('\\/?', '')
            .replace('(?=\\/|$)', '$')
            .match(/^\/\^((?:\\[.*+?^${}()|[\]\\\/]|[^.*+?^${}()|[\]\\\/])*)\$\//);
        return match ? match[1].replace(/\\(.)/g, '$1').split('/') : '<complex:' + thing.toString() + '>';
    }
}
