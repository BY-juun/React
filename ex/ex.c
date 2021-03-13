#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <math.h>
struct list_head {
    struct list_head *next, *prev;
};


#define LIST_POISON1	((void *)0xdeadbeef)
#define LIST_POISON2	((void *)0xbadacafe)
#define MAX_BUFFER 80

unsigned int seed = 0xa200230;

#define offsetof(TYPE, MEMBER)  ((size_t)&((TYPE *)0)->MEMBER)
//부모 구조체접근.
#define container_of(ptr, type, member) ({              \
    void *__mptr = (void *)(ptr);                   \
    ((type *)(__mptr - offsetof(type, member))); })

#define LIST_HEAD_INIT(name) { &(name), &(name) }

#define LIST_HEAD(name) \
	struct list_head name = LIST_HEAD_INIT(name)

static inline void INIT_LIST_HEAD(struct list_head *list)
{
	list->next = list;
	list->prev = list;
} 

static inline void __list_add(struct list_head *new,
			      struct list_head *prev,
			      struct list_head *next)
{
	next->prev = new;
	new->next = next;
	new->prev = prev;
	prev->next = new;
}

/**
 * list_add - add a new entry
 * @new: new entry to be added
 * @head: list head to add it after
 *
 * Insert a new entry after the specified head.
 * This is good for implementing stacks.
 */
static inline void list_add(struct list_head *new, struct list_head *head)
{
	__list_add(new, head, head->next);
}

LIST_HEAD(stack);

struct entry {
	struct list_head list;
	char* string;
};

#define list_entry(ptr, type, member) \
	container_of(ptr, type, member)

/**
 * list_for_each	-	iterate over a list
 * @pos:	the &struct list_head to use as a loop cursor.
 * @head:	the head for your list.
 */
#define list_for_each(pos, head) \
	for (pos = (head)->next; pos != (head); pos = pos->next)

static inline int list_empty(const struct list_head *head)
{
	return head->next == head;
}

static inline void __list_del(struct list_head * prev, struct list_head * next)
{
	next->prev = prev;
	prev->next = next;
}

/**
 * list_del - deletes entry from list.
 * @entry: the element to delete from the list.
 * Note: list_empty() on entry does not return true after this, the entry is
 * in an undefined state.
 */
static inline void __list_del_entry(struct list_head *entry)
{
	__list_del(entry->prev, entry->next);
}

static inline void list_del(struct list_head *entry)
{
	__list_del_entry(entry);
	entry->next = LIST_POISON1;
	entry->prev = LIST_POISON2;
}
static char *generate_string(char *buffer)
{
	char *chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
	int len = 1 + random() % (MAX_BUFFER - 2);
			/* +1 to prevent null string
			 * -1 to consider \0 termination char
			 */
	int i;

	for (i = 0; i < len; i++) {
		buffer[i] = chars[random() % strlen(chars)];
	}
	buffer[len] = '\0';
	return buffer;
}

void push_stack(char *string)
{
	/* TODO: Implement this function */
	struct entry *new_entry = malloc(sizeof(struct entry)); //make new entry and copy string to new_entry's string
	strcpy(new_entry->string,string);
	INIT_LIST_HEAD(&new_entry->list); //initialize list

	if(list_empty(&stack)) //시작상태일때, stack == stack->next
	{
		INIT_LIST_HEAD(&stack);
	}
	list_add(&(new_entry->list),&stack); //push
	//x->prev  x->next  <---------
}


/**
 * pop_stack()
 *
 * DESCRIPTION
 *   Pop a value from @stack and return it through @buffer. The value should
 *   come from the top of the stack, and the corresponding entry should be
 *   removed from @stack.
 *
 * RETURN
 *   If the stack is not empty, pop the top of @stack, and return 0
 *   If the stack is empty, return -1
 */
int pop_stack(char *buffer)
{
	/* TODO: Implement this function */
	if(list_empty(&stack)) //when stack is empty
		return -1; /* Must fix to return a proper value when @stack is not empty */
	else //pop the top of stack and return 0
	{
		struct entry *top = list_entry(stack.next,struct entry, list);
		strcpy(buffer,top->string);
		list_del(stack.next); //del entry
		return 0;
	}
}


/**
 * dump_stack()
 *
 * DESCRIPTION
 *   Dump the contents in @stack. Print out @string of stack entries while
 *   traversing the stack from the bottom to the top. Note that the value
 *   should be printed out to @stderr to get properly graded in pasubmit.
 */
void dump_stack(void)
{
	/* TODO: Implement this function */
	struct list_head *ptr;
	list_for_each(ptr,&stack){
		struct entry *node; //stack전체를 위에서 부터 아래로 내려가면서 확인하는 메크로 결과값 : 76543210
		node = list_entry(ptr,struct entry,list);
		printf("%s\n",node->string);
	}
}


int main(void)
{
    
    int ret;
	char buffer[MAX_BUFFER];
	unsigned int i;

	srandom(seed);

	/* Push 4 values */
	for (i = 0; i < 4; i++) {
		push_stack(generate_string(buffer));
		printf("%s\n", buffer);
	}
	printf("\n");

	/* Dump the current stack */
	dump_stack();
	printf("\n");

	/* Pop 3 values */
	for (i = 0; i < 3; i++) {
		memset(buffer, 0x00, MAX_BUFFER);
		pop_stack(buffer);
		printf("%s\n", buffer);
	}
	printf("\n");

	/* Dump the current stack */
	dump_stack();
	printf("\n");


	/* And so on ..... */
	for (i = 0; i < (1 << 12); i++) {
		push_stack(generate_string(buffer));
	}
	for (i = 0; i < (1 << 12) - 8; i++) {
		pop_stack(buffer);
	}

	dump_stack();
	printf("\n");

	/* Empty the stack by popping out all entries */
	while ((ret = pop_stack(buffer)) >= 0) {
		printf("%s\n", buffer);
		memset(buffer, 0x00, MAX_BUFFER);
	}
    
}