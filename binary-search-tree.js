class Node {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

class Tree {
    constructor(array) {
        this.root = this.buildTree(array);
    }

    buildTree(array) {
        const filteredArr = array.filter((item, index, self) => {
            return self.indexOf(item) === index;
        });
        const sortArr = filteredArr.sort((a, b) => {
            return a - b;
        });
        
        return this.buildBalancedTree(sortArr, 0, sortArr.length - 1);
    }

    buildBalancedTree(array, start, end) {
        if (start > end) return null;

        let mid = Math.floor((start + end) / 2);
        const node = new Node(array[mid]);

        node.left = this.buildBalancedTree(array, start, mid - 1);
        node.right = this.buildBalancedTree(array, mid + 1, end);
        
        return node;
    }

    includes(value) {
        let current = this.root;

        while (current !== null) {
            if (current.data === value) {
                return true;
            } else if (current.data > value){
                current = current.left;
            } else {
                current = current.right;
            }
        }
        return false;
    }

    insert(value) {
        if (this.root === null) {
            this.root = new Node(value);
            return;
        }

        let current = this.root;

        while (true) {
            if (current.data === value) {
                return;
            }

            if (current.data > value) {
                if (current.left === null) {
                    current.left = new Node(value);
                    return;
                } else {
                    current = current.left;
                }
            } else {
                if (current.right === null) {
                    current.right = new Node(value);
                    return;
                } else {
                    current = current.right;
                }
            }
        }
    }

    deleteItem(value) {
        this.root = this.deleteNode(this.root, value);
    }

    deleteNode(node, value) {
        if (node === null) return null;

        if (node.data > data) {
            node.left = this.deleteNode(node.left, value);
        } else if (node.data < data) {
            node.right = this.deleteNode(node.right, value);
        } else {
            if (node.left === null) return node.right;
            if (node.right === null) return node.left;

            let successor = node.right;
            while (successor.left !== null) {
                successor = successor.left;
            }
            node.data = successor.data;
            node.right = this.deleteNode(node.right, successor.data);
        }
        return node;
    }
    
    levelOrderForEach(callback) {
        if (typeof callback !== 'function') {
            return console.log("Callback is required");
        }

        if (this.root === null) return;

        let queue = [this.root];

        while (queue.length > 0) {
            let current = queue.shift();

            callback(current.data);

            if (current.left !== null) queue.push(current.left);
            if (current.right !== null) queue.push(current.right);
        }

    }

    inOrderForEach(callback) {
        if (typeof callback !== 'function') {
            return console.log("Callback is required");
        }

        const traverse = (node) => {
            if (node === null) return;

            traverse(node.left);
            callback(node.data);
            traverse(node.right);
        }

        traverse(this.root);
    }

    preOrderForEach(callback) {
        if (typeof callback !== 'function') {
            return console.log("Callback is required");
        }

        const traverse = (node) => {
            if (node === null) return;

            callback(node.data);
            traverse(node.left);
            traverse(node.right);
        }
        traverse(this.root);
    }

    postOrderForEach(callback) {
        if (typeof callback !== 'function') {
            return console.log("Callback is required");
        }
    
        const traverse = (node) => {
            if (node === null) return;

            traverse(node.left);
            traverse(node.right);
            callback(node.data);
        }
        traverse(this.root);
    }

    calculateHeight(node) {
            if (node === null) return -1;

            let leftHeight = calculateHeight(node.left);
            let rightHeight = calculateHeight(node.right);

            return 1 + Math.max(leftHeight, rightHeight);
    }

    height(value) {
        const findNode = (node, value) => {
            if (node === null) return null;
            if (node.data === value) return node;

            if (value < node.data) return findNode(node.left, value);
            return findNode(node.right, value);
        }
        const node = findNode(this.root, value);

        if (node === null) throw new Error("Value not found in tree");

        return this.calculateHeight(node);
    }

    depth(value) {
        let current = this.root;
        let depth = 0;

        while (current !== null) {
            if (current.data === value) return depth;

            if (value < current.data) {
                current = current.left;
            } else {
                current = current.right;
            }

            depth++;
        }

        throw new Error("Value not found in tree");
    }

    isBalanced() {
        const checkBalanced = (node) => {
            if (node === null) return true;
            
            let leftHeight = this.calculateHeight(node.left);
            let rightHeight = this.calculateHeight(node.right);

            if (Math.abs(leftHeight - rightHeight > 1)) return false;

            return checkBalanced(node.left) && checkBalanced(node.right);
        }

        return checkBalanced(this.root);
    }

    rebalance() {
        if (this.isBalanced()) return;

        let sortedArray = [];

        this.inOrderForEach((value) => sortedArray.push(value));

        this.root = this.buildTree(sortedArray);
    }
}

const prettyPrint = (node, prefix = '', isLeft = true) => {
  if (node === null || node === undefined) {
    return;
  }

  prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
  console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
  prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
}